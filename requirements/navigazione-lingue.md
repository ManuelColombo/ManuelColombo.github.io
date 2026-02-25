# Navigazione tra le lingue

## URL

La struttura degli URL segue una convenzione semplice:

| Italiano | Inglese |
|---|---|
| `/` | `/en/` |
| `/blog/il-mio-post/` | `/en/blog/il-mio-post/` |
| `/cv/` | `/en/cv/` |

L'italiano è la lingua "default" — nessun prefisso. L'inglese vive sotto `/en/`.

Questa scelta riflette che il sito è primariamente italiano. Un utente che arriva su `/blog/post/` vede italiano. Un utente che arriva su `/en/blog/post/` vede inglese. Nessun redirect automatico basato sul browser — è una scelta troppo invasiva per un sito personale.

---

## Switcher di lingua

Nell'header, accanto alla navigazione, un piccolo link:
- Se sei su `/blog/il-mio-post/` → link a `/en/blog/il-mio-post/` con testo "EN"
- Se sei su `/en/blog/il-mio-post/` → link a `/blog/il-mio-post/` con testo "IT"
- Se la traduzione non esiste ancora → link disabilitato o assente

Il template deve sapere qual è la controparte nella lingua opposta. Questo si può fare passando nel front matter il campo `source` (nei file `.en.md`) e costruendo la corrispondenza nei template Nunjucks.

### Logica nel template

Per i post italiani, il permalink della versione inglese è `/en/` + permalink italiano:
```nunjucks
{% set en_url = "/en" + page.url %}
```

Per i post inglesi, il permalink italiano si ricava dal campo `source` nel front matter.

Il link appare solo se la traduzione esiste effettivamente. Si può verificare con una collection Eleventy che mappa i permalink inglesi.

---

## Metadati SEO

Ogni pagina deve dichiarare le sue controparti linguistiche con `hreflang`:

```html
<link rel="alternate" hreflang="it" href="https://manuelcolombo.github.io/blog/il-mio-post/">
<link rel="alternate" hreflang="en" href="https://manuelcolombo.github.io/en/blog/il-mio-post/">
```

Questo va aggiunto ai template `base.njk` e `blog_post.njk` condizionalmente (solo se esiste la versione nella lingua opposta).

---

## Indice blog in inglese

La pagina `/en/blog/` deve elencare tutti i post con `lang: en` nel front matter, analogamente a come `blog.md` elenca i post italiani.

Un file `en/blog.md` con la collection `blogEn` è sufficiente:

```yaml
---
layout: base.njk
title: "Blog"
permalink: "/en/blog/"
---
```

```nunjucks
{% for post in collections.blogEn | reverse %}
  ...
{% endfor %}
```

---

## Cosa non tradurre

Alcune pagine potrebbero non avere senso in inglese o non valere lo sforzo:
- La lettera di presentazione (`cover_letter.md`) — forse sì, forse no, dipende dal pubblico
- La vita chart (`mi_life_chart.md`) — probabilmente sì
- Il CV — probabilmente già scritto in inglese

Questa scelta non è tecnica, è editoriale. Il sistema deve permettere di tradurre selettivamente, non tutto o niente.
