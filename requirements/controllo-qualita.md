# Controllo qualità della traduzione

## Il problema

La traduzione automatica tende ad appiattire la voce. Un testo personale e diretto in italiano può diventare in inglese qualcosa di generico, eccessivamente formale, o troppo liscio. Il controllo della prosa inglese non è un lusso — è necessario per mantenere l'identità del sito.

## Primo livello: il prompt di traduzione

La qualità parte dal prompt dato all'API. Un prompt generico ("traduci questo in inglese") darà risultati generici. Un prompt calibrato sul tono del sito darà risultati molto migliori.

### Bozza di prompt di sistema

```
You are translating personal blog posts from Italian to English.

The author's voice is: direct, opinionated, sometimes abrupt.
He doesn't soften strong opinions. He uses short paragraphs.
He writes like he's talking to an intelligent reader, not explaining things.

Rules:
- Preserve the sentence rhythm where possible. Don't merge short sentences.
- Keep book titles, film titles, and proper names in their original language,
  adding the English title in parentheses only if it's widely known by a different name.
- Do not translate the YAML front matter fields: layout, permalink, date, tags, category, thumbnail, excerpt.
  Translate only: title, description, and the body content.
- Internal links starting with /blog/ should be changed to /en/blog/.
- Do not add explanatory context that isn't in the original.
- If a sentence is deliberately ambiguous or incomplete in Italian, keep it so in English.
```

Questo prompt va affinato con l'uso. La prima volta che la traduzione suona strana, il prompt va aggiornato.

---

## Secondo livello: il file `.en.md` come bozza editabile

Il file tradotto è un file markdown normale. Dopo aver lanciato `npm run translate`, l'utente può:

1. Aprire `blog/il-mio-post.en.md`
2. Leggere il testo
3. Modificare le frasi che non suonano bene
4. Quando è soddisfatto, cambiare `translation_reviewed: false` in `true` nel front matter

Il campo `translation_reviewed` può essere usato da Eleventy per:
- Mostrare un banner "traduzione automatica, non ancora revisionata" in staging
- Eventualmente escludere i post non revisionati dal feed RSS inglese

---

## Terzo livello: rieseguire la traduzione selettivamente

Se l'originale italiano cambia dopo la traduzione, lo script deve segnalarlo — non sovrascrivere automaticamente le modifiche manuali.

Una strategia: confrontare un hash del contenuto del file sorgente con quello salvato nel front matter del file tradotto al momento della generazione. Se sono diversi, lo script avvisa ma non sovrascrive.

```yaml
source_hash: "a3f2c1..."   ← hash del body italiano al momento della traduzione
```

---

## Quarto livello: l'opzione "paragrafo manuale"

In futuro si potrebbe aggiungere un meccanismo per marcare blocchi nel file italiano che non devono essere tradotti automaticamente, ma sostituiti con una versione scritta a mano:

```markdown
<!-- en: This is the hand-written English version of this paragraph. -->
Questa è la versione italiana che non voglio far tradurre automaticamente.
```

Questo livello di controllo granulare è overkill nella fase iniziale, ma vale la pena tenerlo a mente come evoluzione possibile.

---

## Cosa fa il controllo qualità in pratica

Il flusso reale diventa:

1. Scrivo un post in italiano → `git staging`
2. Sulla preview lo leggo e sono soddisfatto
3. Lancio `npm run translate` → vengono generati/aggiornati i file `.en.md`
4. Leggo la traduzione inglese, correggo quello che non va
5. Quando è pronta: `translation_reviewed: true`
6. `git publish` → va tutto in produzione

La traduzione non blocca il flusso. Se non ho voglia di rivedere, posso pubblicare anche senza il flag — la traduzione automatica è comunque leggibile.
