#!/usr/bin/env node
// scripts/translate.js
// Usage: node scripts/translate.js [--force]
//   --force  retranslate even if source unchanged or translation was manually reviewed

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

// Load .env if present
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  });
}

const Anthropic = require('@anthropic-ai/sdk');
const matter    = require('gray-matter');

const ROOT  = path.join(__dirname, '..');
const FORCE = process.argv.includes('--force');

// ── Static pages to translate ──────────────────────────────────────────────
// src: path relative to ROOT
// dest: path relative to ROOT (created by script)
// permalink: the /en/ URL for the generated page
const STATIC_PAGES = [
  { src: 'index.md',                   dest: 'en/index.md',                   permalink: '/en/' },
  { src: 'cv.md',                      dest: 'en/cv.md',                      permalink: '/en/cv/' },
  { src: 'approach.md',                dest: 'en/approach.md',                permalink: '/en/approach/' },
  { src: 'approach/Project_list.md',   dest: 'en/approach/Project_list.md',   permalink: '/en/approach/portfolio/' },
];

// ── System prompt (from requirements/controllo-qualita.md) ────────────────
const SYSTEM_PROMPT = `\
You are translating personal blog posts and web pages from Italian to English.

The author's voice is: direct, opinionated, sometimes abrupt.
He doesn't soften strong opinions. He uses short paragraphs.
He writes like he's talking to an intelligent reader, not explaining things.

Rules:
- Preserve the sentence rhythm where possible. Don't merge short sentences.
- Keep book titles, film titles, and proper names in their original language,
  adding the English title in parentheses only if it's widely known by a different name.
- Do not translate YAML front matter fields: layout, permalink, date, tags, category,
  thumbnail, excerpt. Translate only: title, description, and the body content.
- Internal links starting with /blog/ must be changed to /en/blog/.
- Do not add explanatory context that isn't in the original.
- If a sentence is deliberately ambiguous or incomplete in Italian, keep it so in English.
- Preserve all Markdown formatting, HTML tags, and custom syntax like ::text::.
- Preserve image syntax exactly, including alt text prefixes like "cover|", "half|", "inline|".

Output format — respond with EXACTLY these lines, no preamble, no commentary:
TITLE: [translated title on a single line]
DESCRIPTION: [translated description on a single line, or empty if none]
[blank line]
[translated body markdown — everything after this blank line]`;

// ── Helpers ────────────────────────────────────────────────────────────────

function contentHash(body, title) {
  return crypto.createHash('sha256')
    .update(body + '\n' + (title || ''))
    .digest('hex')
    .slice(0, 16);
}

async function callClaude(client, title, description, body) {
  const userMessage = `TITLE: ${title}
DESCRIPTION: ${description || ''}

${body}`;

  const response = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    system:     SYSTEM_PROMPT,
    messages:   [{ role: 'user', content: userMessage }],
  });

  const text  = response.content[0].text.trim();
  const lines = text.split('\n');

  const titleLine = lines.find(l => l.startsWith('TITLE:'));
  const descLine  = lines.find(l => l.startsWith('DESCRIPTION:'));

  // Body starts after the blank line that follows the header section
  let bodyStart = 2; // default: skip TITLE + DESCRIPTION lines
  for (let i = 0; i < lines.length; i++) {
    if (i > 0 && lines[i].trim() === '' &&
        (lines[i - 1].startsWith('TITLE:') || lines[i - 1].startsWith('DESCRIPTION:'))) {
      bodyStart = i + 1;
      break;
    }
  }

  return {
    title:       titleLine ? titleLine.replace(/^TITLE:\s*/, '').trim()       : title,
    description: descLine  ? descLine.replace(/^DESCRIPTION:\s*/, '').trim() : (description || ''),
    body:        lines.slice(bodyStart).join('\n').trim(),
  };
}

// ── Core: process one file ─────────────────────────────────────────────────

async function processFile(client, srcPath, destPath, enPermalink) {
  const srcFull  = path.join(ROOT, srcPath);
  const destFull = path.join(ROOT, destPath);

  if (!fs.existsSync(srcFull)) {
    console.log(`  ⚠  Source not found: ${srcPath}`);
    return;
  }

  const srcRaw              = fs.readFileSync(srcFull, 'utf-8');
  const { data: srcFm, content: srcBody } = matter(srcRaw);
  const currentHash         = contentHash(srcBody, srcFm.title);

  // ── Check if translation is already up to date ─────────────────
  if (fs.existsSync(destFull) && !FORCE) {
    const destRaw         = fs.readFileSync(destFull, 'utf-8');
    const { data: destFm } = matter(destRaw);

    if (destFm.source_hash === currentHash) {
      console.log(`  ✓  Up to date:           ${destPath}`);
      return;
    }

    if (destFm.translation_reviewed === true) {
      console.log(`  ⚠  Reviewed + changed:   ${destPath}`);
      console.log(`     Source changed after manual review — run with --force to retranslate.`);
      return;
    }

    console.log(`  ↻  Source changed:        ${destPath}`);
  } else if (fs.existsSync(destFull) && FORCE) {
    console.log(`  ↻  Forced retranslation:  ${destPath}`);
  } else {
    console.log(`  +  New:                   ${destPath}`);
  }

  // ── Translate ──────────────────────────────────────────────────
  const translated = await callClaude(
    client,
    srcFm.title       || '',
    srcFm.description || '',
    srcBody
  );

  // ── Build translated front matter ─────────────────────────────
  // Start from source front matter (preserves layout, date, tags, thumbnail…)
  const newFm = { ...srcFm };
  newFm.lang                 = 'en';
  newFm.title                = translated.title;
  if (translated.description) newFm.description = translated.description;
  newFm.permalink            = enPermalink;
  newFm.source               = srcPath;
  newFm.source_hash          = currentHash;
  newFm.translation_reviewed = false;

  const newContent = matter.stringify('\n' + translated.body, newFm);

  fs.mkdirSync(path.dirname(destFull), { recursive: true });
  fs.writeFileSync(destFull, newContent, 'utf-8');
  console.log(`     Written.`);
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is not set.');
    console.error('       Set it with: export ANTHROPIC_API_KEY=sk-ant-...');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // ── Blog posts ─────────────────────────────────────────────────
  console.log('\nBlog posts:');
  const blogDir   = path.join(ROOT, 'blog');
  const blogFiles = fs.readdirSync(blogDir)
    .filter(f =>
      f.endsWith('.md') &&
      !f.includes('.en.') &&
      !f.startsWith('_')
    );

  for (const file of blogFiles) {
    const srcPath  = `blog/${file}`;
    const slug     = file.replace('.md', '');
    const destPath = `blog/${slug}.en.md`;

    // Compute English permalink from Italian one
    const { data: srcFm } = matter(fs.readFileSync(path.join(ROOT, srcPath), 'utf-8'));
    const enPermalink = srcFm.permalink
      ? '/en' + srcFm.permalink
      : `/en/blog/${encodeURIComponent(slug)}/`;

    await processFile(client, srcPath, destPath, enPermalink);
  }

  // ── Static pages ───────────────────────────────────────────────
  console.log('\nStatic pages:');
  for (const page of STATIC_PAGES) {
    await processFile(client, page.src, page.dest, page.permalink);
  }

  console.log('\nAll done.\n');
}

main().catch(err => {
  console.error('\nFatal:', err.message);
  process.exit(1);
});
