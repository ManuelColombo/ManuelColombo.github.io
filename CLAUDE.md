# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website built with Eleventy (11ty) static site generator. Content is written in Markdown, templates use Nunjucks. The site has a dual-deployment setup for staging and production.

## Development Commands

```bash
# Local development server (http://localhost:8080)
npm start

# Build site (output to _site/)
npm run build
```

## Git Workflow & Deployment

This project uses **custom git aliases** for a streamlined staging/production workflow:

```bash
git preview    # Switch to Local_writing branch (staging)
git live       # Switch to master branch (production)
git staging    # Add, commit, and push to Local_writing
git publish    # Merge Local_writing → master and push (deploys to production!)
```

### Deployment Architecture

- **Production**: `master` branch → https://manuelcolombo.github.io
- **Staging/Preview**: `Local_writing` branch → https://manuelcolombo.github.io/preview

Both branches auto-deploy via GitHub Actions (`.github/workflows/deploy.yml`) to the `gh-pages` branch.

### Path Prefix Handling

The staging environment uses a **pathPrefix** to handle the `/preview/` subdirectory:

- **Environment variable**: `PATH_PREFIX=/preview` is set during staging builds (in deploy.yml)
- **Eleventy config** (`.eleventy.js` line 47): `pathPrefix: process.env.PATH_PREFIX || "/"`
- **URL filter**: All asset/link paths in templates use the `| url` filter (e.g., `{{ '/assets/style.css' | url }}`)
- **Transform**: A custom transform (`fixInternalLinks`) automatically prefixes internal links in HTML when `pathPrefix !== "/"`

When working on path-related issues, remember that the `| url` filter automatically applies the pathPrefix.

## Architecture

### Directory Structure

```
_includes/          # Nunjucks templates
  base.njk         # Main layout (used by most pages)
  blog_post.njk    # Blog post layout (includes utteranc.es comments)
  header.njk       # Site header with navigation
  footer.njk       # Site footer
  breadcrumb.njk   # Breadcrumb navigation
  card.njk         # Reusable card component

blog/              # Blog posts (Markdown files)
approach/          # Project portfolio pages
assets/            # Static files (CSS, images)
  style.css        # Main stylesheet (processed by Lightning CSS)

_site/             # Build output (git-ignored, auto-generated)
```

### Template Layouts

- **base.njk**: Standard layout for pages (header + content + footer)
- **blog_post.njk**: Blog-specific layout with breadcrumbs and utteranc.es comments
- Both templates show staging indicators when `isStaging` is true (purple bar, "STG ::" prefix)

### Eleventy Configuration (.eleventy.js)

Key features:
- **Lightning CSS plugin** for CSS processing
- **Global data**: `isStaging` and `pathPrefix` injected based on `PATH_PREFIX` env var
- **Custom transform**: Fixes internal links (`href="/..."` and `src="/..."`) to include pathPrefix
- **Nunjucks date filter** for blog post dates
- **Passthrough copy**: `assets/` folder copied directly to output

### Staging Visual Indicators

When `PATH_PREFIX=/preview` (staging mode):
- Purple 4px bar at top of page (via inline style in templates)
- "STG ::" prefix in page titles
- `class="staging"` on body element

## Content Management

Blog posts are Markdown files in `blog/` with YAML front matter:

```yaml
---
layout: blog_post.njk
title: "Post Title"
description: "Meta description"
date: 2025-09-01
---
```

The blog index (`blog.md`) uses Eleventy collections to list all posts.

## Important Notes

- **Never commit `_site/`** - it's in .gitignore and auto-generated
- **GitHub Actions handle builds** - no need to run `npm run build` before pushing
- **Staging = Local_writing branch** - content here is visible at /preview but not on main site
- **Use `git publish` carefully** - it merges to master and deploys to production immediately
