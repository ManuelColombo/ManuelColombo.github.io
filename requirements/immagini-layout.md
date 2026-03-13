# Layout delle immagini nei post

## Filosofia: no-class HTML

In questo progetto il CSS non usa classi (vedi branch `noCSS-experiment`). Le variazioni di layout
delle immagini si esprimono tramite **attributi HTML semantici**, non classi. Il meccanismo scelto
è `data-layout` su `<figure>` o `<img>`.

Vantaggi rispetto alle classi:
- Il Markdown/HTML resta leggibile e auto-documentante
- Il CSS seleziona per struttura e attributo (`figure[data-layout="wide"]`), non per nome arbitrario
- Si allinea alla stessa logica del resto del sistema (es. `nav a[lang]` per il language switcher)

---

## Varianti disponibili

Un transform in `.eleventy.js` converte automaticamente la sintassi Markdown abbreviata in HTML
con attributi `data-layout`. In alternativa si può scrivere HTML grezzo direttamente nel `.md`.

| Sintassi Markdown | HTML generato |
|---|---|
| `![descrizione](img.jpg)` | `<img src="img.jpg" alt="descrizione">` |
| `![masthead\|alt](img.jpg)` | `<figure data-layout="masthead"><img alt="alt"></figure>` |
| `![cover\|alt](img.jpg)` | `<figure data-layout="cover"><img alt="alt"></figure>` |
| `![wide\|alt](img.jpg)` | `<figure data-layout="wide"><img alt="alt"></figure>` |
| `![half\|alt](img.jpg)` | `<figure data-layout="half"><img alt="alt"></figure>` |
| `![inline\|alt](img.jpg)` | `<img data-layout="inline" alt="alt">` |
| `![inline-right\|alt](img.jpg)` | `<img data-layout="inline-right" alt="alt">` |

> La parte prima del `|` è il layout, la parte dopo è il testo alternativo (`alt`).
> I layout `cover`, `wide`, `half` rimuovono automaticamente il `<p>` wrapper che Markdown aggiunge.

---

### `masthead` — hero a inizio articolo

Immagine full-bleed ad altezza fissa (55vh) che occupa tutta la larghezza sopra il titolo.
L'altezza è calibrata perché il titolo `h1` rimanga visibile al primo scroll sia su desktop che mobile.
Va messa come **primissima riga del contenuto**, prima del kicker e del titolo.

```md
![masthead|Descrizione immagine hero](/percorso/immagine.jpg)

::kicker opzionale::
# Titolo dell'articolo
```

---

### Nessun attributo — immagine standard

```md
![Didascalia dell'immagine](percorso/immagine.jpg)
```

Comportamento: larghezza massima del container, ombra sottile, border-radius.

Con didascalia visibile (HTML diretto):

```html
<figure>
  <img src="percorso/immagine.jpg" alt="descrizione">
  <figcaption>Testo didascalia</figcaption>
</figure>
```

---

### `cover` — full bleed

Esce dal container e occupa tutta la larghezza del viewport.

```md
![cover|Descrizione dell'immagine](percorso/immagine.jpg)
```

---

### `wide` — più larga del testo

Leggermente più larga della colonna di testo (aggiunge ~6rem ai lati).
Su mobile ritorna alla larghezza normale.

```md
![wide|Descrizione dell'immagine](percorso/immagine.jpg)
```

---

### `half` — metà colonna, flotta a sinistra

Occupa il 50% della larghezza e lascia scorrere il testo a destra.
Su mobile torna a larghezza piena, senza float.

```md
![half|Descrizione dell'immagine](percorso/immagine.jpg)
```

---

### `inline` — piccola, dentro il testo, sinistra

Immagine che flotta a sinistra dentro un paragrafo. Il testo scorre a destra.

```md
![inline|Descrizione](percorso/immagine.jpg) Qui continua il testo del paragrafo...
```

---

### `inline-right` — piccola, dentro il testo, destra

Come `inline` ma flotta a destra. Il testo scorre a sinistra.

```md
![inline-right|Descrizione](percorso/immagine.jpg) Qui continua il testo del paragrafo...
```

---

## Dove sono le definizioni CSS

File: `assets/style.css`, sezione `/* ── Image sizing system: figure[data-layout] */`.

```css
figure[data-layout="cover"]  { ... }
figure[data-layout="wide"]   { ... }
figure[data-layout="half"]   { ... }
img[data-layout="inline"]    { ... }
img[data-layout="inline-right"] { ... }
```

---

## Domanda aperta: alternative no-class pure

L'attributo `data-layout` è una soluzione pragmatica ma è comunque un attributo inventato,
non semantico HTML nativo. Alcune alternative da considerare:

| Approccio | Esempio | Pro | Contro |
|-----------|---------|-----|--------|
| `data-layout` (attuale) | `<figure data-layout="wide">` | Esplicito, leggibile | Non nativo HTML |
| Posizione nel DOM | `figure:first-child` | Zero markup extra | Dipende dall'ordine, fragile |
| Elemento contenitore | `<aside><figure>` | Semantico | `aside` ha significato diverso |
| `<figure>` + `<figcaption>` con lunghezza | — | — | Non influenza il layout |

Per ora `data-layout` è il compromesso migliore: è un attributo, non una classe,
e si seleziona con `[attr]` selector, coerente con la filosofia del progetto.
