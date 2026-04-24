# Proposta: Post fotografici con gallerie

## Problema

I normali post del blog usano le immagini come supporto al testo. Serve un formato dove le immagini sono protagoniste, in numero, formato e stile variabile (fotografie, grafica). La composizione deve essere interessante su desktop, pulita e verticale su mobile.

---

## Principi guida

- **Markdown standard** per scrivere i post (nessuna sintassi aliena)
- La composizione si dichiara nei **metadati del gruppo**, non nel singolo file
- Su **mobile**: sempre colonna singola, immagini una sotto l'altra
- Su **desktop**: composizioni a griglia con proporzioni controllabili
- Integrazione con il sistema `imgSize` e `imgOptimize` già esistenti

---

## 1. Tipo di post

Un nuovo layout `photo_post.njk`, simile a `blog_post.njk` ma:

- Senza commenti (utteranc.es non ha senso qui)
- Padding ridotto, più spazio bianco intorno alle immagini
- Nessun titolo `# H1` nel corpo del testo (il titolo è nel front matter)
- Il testo rimane possibile ma trattato come didascalia/note tra i blocchi

**Front matter minimo:**
```yaml
---
layout: photo_post.njk
title: "Tokyo, marzo"
date: 2026-04-01
tags: ["blog", "fotografia"]
thumbnail: /assets/blog/tokyo/01.jpg
---
```

---

## 2. Sintassi gallery in markdown

### 2a. Gruppo di immagini (riga contigua)

Immagini consecutive senza riga vuota tra loro formano un **gruppo galleria**. Il transform raggruppa i `<img>` in un `<div class="gallery">`.

```markdown
![/assets/blog/tokyo/01.jpg](alt)
![/assets/blog/tokyo/02.jpg](alt)
![/assets/blog/tokyo/03.jpg](alt)
```

Su mobile → colonna. Su desktop → griglia automatica (1, 2 o 3 colonne in base al numero).

### 2b. Proporzioni per immagine (opzionale)

Si usa il campo alt con un prefisso numerico `N|` per assegnare un peso relativo nell'asse orizzontale (CSS `grid` con `fr`). Senza prefisso = peso 1.

```markdown
![2|Panorama della città](/assets/blog/tokyo/01.jpg)
![1|Dettaglio](/assets/blog/tokyo/02.jpg)
```

Risultato desktop: prima immagine larga il doppio della seconda (2fr + 1fr).

```markdown
![3|Verticale](/assets/blog/tokyo/03.jpg)
![1|](/assets/blog/tokyo/04.jpg)
![1|](/assets/blog/tokyo/05.jpg)
```

Risultato desktop: prima immagine domina, le altre due a destra in colonna.

### 2c. Composizioni predefinite (named layouts)

Per pattern ricorrenti si usano nomi invece di numeri, dichiarati sull'immagine capofila del gruppo:

| Sintassi alt         | Comportamento desktop           |
|----------------------|---------------------------------|
| `full|caption`       | Immagine a piena larghezza, da sola |
| `pair|caption`       | Due immagini al 50/50           |
| `feature|caption`    | Prima al 60%, seconda al 40%   |
| `triptych|caption`   | Tre immagini uguali in riga     |
| `mosaic|caption`     | Prima grande sinistra + due piccole a destra in colonna |

Le immagini successive nello stesso gruppo ereditano il layout dalla prima.

**Esempio pratico:**
```markdown
![mosaic|Vista generale](/assets/blog/tokyo/panorama.jpg)
![Vicolo](/assets/blog/tokyo/vicolo.jpg)
![Insegna](/assets/blog/tokyo/insegna.jpg)

Un breve testo descrittivo tra due blocchi di immagini.

![pair|Mercato](/assets/blog/tokyo/mercato.jpg)
![Pesce](/assets/blog/tokyo/pesce.jpg)

![full|Tramonto sul porto](/assets/blog/tokyo/tramonto.jpg)
```

---

## 3. Comportamento CSS

### Mobile (< 640px)
Tutte le gallerie diventano colonna singola. Le immagini si ridimensionano a `width: 100%`. L'ordine nel DOM corrisponde all'ordine nel markdown.

### Desktop (≥ 640px)
Ogni gruppo diventa un `display: grid`. Le colonne si calcolano con `grid-template-columns` basato sui pesi fr dichiarati o sulla composizione predefinita.

Le immagini verticali (portrait) non vengono ritagliate: si usa `object-fit: contain` all'interno della cella, o in alternativa le immagini adiacenti si allineano top e la differenza di altezza lascia spazio vuoto — scelta più naturale per la fotografia.

Opzionale: `object-fit: cover` con altezza fissa per gallerie più "editoriali" (stile stewartpartners). Da decidere per post.

---

## 4. Stile visivo

Tre possibili direzioni, da scegliere o combinare per post:

**A – Minimal grid** (ispirazione stewartpartners)
Griglia pulita, sfondi bianchi/neutri, immagini con piccolo gutter tra loro. Aspect ratio libero, celle alte quanto le immagini. Molto fotografico e pulito.

**B – Editorial** (ispirazione yzavoku)
Immagini grandi, alcune a piena larghezza, spaziatura generosa. Mix di righe con 1 e 2 immagini. Sembra un layout di rivista.

**C – Canvas libero** (ispirazione christmas.rogue)
Immagini sovrapposte o con offset, rotazioni leggere, effetto bacheca/collage. Molto complesso da gestire bene con contenuti variabili. **Sconsigliato per prima versione.**

**Raccomandazione**: partire con **A** per semplicità e solidità, con la possibilità di fare post in stile **B** tramite il layout `full` e spaziatura generosa.

---

## 5. Tool di ottimizzazione immagini

Uno script Node.js locale (non parte del build) da usare prima di aggiungere foto al repo.

### Uso
```bash
node scripts/optimize-image.js path/to/foto.jpg
node scripts/optimize-image.js path/to/foto.jpg --out assets/blog/tokyo/
node scripts/optimize-image.js path/to/cartella/*.jpg --out assets/blog/tokyo/
```

### Cosa fa
1. Ridimensiona se più larga di **2400px** (mantiene proporzioni)
2. Converte in **JPEG progressivo** con qualità 85
3. Se il file è già ottimizzato (< 200KB), lo copia senza ricomprimere
4. Salva nella cartella `--out` con il nome originale in minuscolo, spazi → trattini
5. Stampa un riepilogo: dimensioni prima/dopo, risparmio in KB

### Dipendenza
Solo `sharp` (già in molti progetti Node, leggero). Si aggiunge come `devDependency`.

**Nota**: il build di Eleventy ottimizza già le immagini via `@11ty/eleventy-img` (già configurato). Questo script serve per *pre-ottimizzare* prima di committare, per tenere il repo leggero e il build veloce.

---

## 6. Cosa va costruito

| Componente | Tipo | Note |
|---|---|---|
| `photo_post.njk` | Nuovo template | Basato su `blog_post.njk`, senza commenti |
| Transform `galleryGroup` in `.eleventy.js` | Nuovo transform | Raggruppa immagini consecutive in `<div class="gallery">` con `grid-template-columns` |
| Stili `.gallery` in `style.css` | CSS | Layout mobile/desktop, varianti per composizione |
| `scripts/optimize-image.js` | Script Node | Pre-ottimizzazione locale, usa sharp |

---

## Aperto

- Si vuole anche una **pagina indice** separata per i post fotografici (tipo `/foto/`), distinta dal blog di testo?
  - No, il layout fotografico può essere usato sia per i post in blg, sia per quelli in approach. Non ha un senso semantico. 
- Le gallerie devono avere un **lightbox** (click sull'immagine → fullscreen)? Sì/No cambia molto la complessità frontend. 
  - No, assolutamente niente lightbox
- Vogliamo supportare **video** (es. clip brevi `.mp4`) nella stessa sintassi? non attualmente, ma considera che può essere un'evoluzione futura
- Le fotografie hanno tutte ratio libera o si vuole un'altezza fissa per riga su desktop (tipo Pinterest row)? no, tutte ratio libera.

### Altre questioni mie
- Per il formato, a senso convertireli tutti in jpg 85 o è meglio usare i nuovi formati webp?
- Per lo script è possibile far si che ad ogni commit su Local Writing faccia il check delle immagini e che converta in automatico tutte quelle che non sono sistemate?