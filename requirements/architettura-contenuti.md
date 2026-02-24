# Architettura dei contenuti

## Dove vivono i file tradotti?

### Opzione A: file `.en.md` nella stessa cartella
```
blog/
  il-mio-post.md          ← originale italiano
  il-mio-post.en.md       ← traduzione inglese (auto-generata)
```

**Pro:** il file tradotto è visibilmente vicino all'originale. Facile da trovare e modificare.
**Contro:** la cartella `blog/` diventa affollata. Il permalink italiano e quello inglese devono essere distinti nel front matter.

### Opzione B: cartella `en/` separata per lingua
```
blog/
  il-mio-post.md          ← originale italiano
en/
  blog/
    il-mio-post.md        ← traduzione inglese
```

**Pro:** struttura pulita, rispecchia la struttura degli URL (`/blog/` e `/en/blog/`).
**Contro:** la corrispondenza tra originale e traduzione non è immediata visivamente.

### Opzione C: file unico con contenuto multilingue nel front matter
```yaml
---
title_it: "Il mio post"
title_en: "My post"
content_en: "..."
---
```

**Contro:** i file markdown diventano pesanti e illeggibili. Scartata.

---

## Proposta: Opzione A con convenzione di naming chiara

Un file `blog/il-mio-post.md` genera:
- URL italiano: `/blog/il-mio-post/`
- File tradotto: `blog/il-mio-post.en.md`
- URL inglese: `/en/blog/il-mio-post/`

### Front matter del file italiano (invariato)
```yaml
---
layout: blog_post.njk
title: "Titolo in italiano"
date: 2025-11-16
permalink: "/blog/il-mio-post/"
---
```

### Front matter del file tradotto (generato dallo script)
```yaml
---
layout: blog_post.njk
lang: en
title: "Title in English"
date: 2025-11-16
permalink: "/en/blog/il-mio-post/"
source: "blog/il-mio-post.md"
translation_reviewed: false
---

[contenuto tradotto]
```

Il campo `source` collega la traduzione all'originale — utile per sapere se l'originale è cambiato dopo l'ultima traduzione. Il campo `translation_reviewed` permette al sito di mostrare un avviso nella versione staging ("traduzione non ancora revisionata").

---

## Come Eleventy gestisce le due lingue

Eleventy tratta i file `.en.md` come qualsiasi altro file markdown. Per generare correttamente i permalink `/en/blog/...`, lo script di traduzione scrive il permalink corretto nel front matter.

Opzionalmente, si può usare una collection Eleventy separata per i post in inglese:

```js
eleventyConfig.addCollection("blogEn", col =>
  col.getFilteredByGlob("./blog/*.en.md").reverse()
);
```

Questo permette di avere un indice blog separato per la versione inglese.

---

## Cosa NON va tradotto automaticamente

- Il front matter tecnico (permalink, layout, date, tags)
- I blocchi di codice
- I nomi propri e i titoli di libri/film (si può istruire il modello a lasciarli in originale o a traslitterarli)
- I link interni (devono puntare alla versione `/en/` corrispondente)

Lo script di traduzione deve passare istruzioni esplicite su questi punti nel prompt. Vedi [controllo-qualita.md](./controllo-qualita.md).
