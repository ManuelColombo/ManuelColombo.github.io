# Visibilità dei file per ambiente

## Il problema

Non tutti i file markdown devono essere pubblicati. Alcuni sono bozze in lavorazione, altri sono note di supporto senza una pagina destinata. Il sito deve poter gestire questi casi senza doverli spostare fuori dal repository o dal ramo di lavoro.

## Comportamento atteso

### File senza layout → mai pubblicati

Un file markdown senza `layout` nel front matter non genera nessuna pagina HTML in nessun ambiente. Serve per tenere nel repository file di appoggio (note, schemi, testi non ancora formattati) senza che compaiano nel sito.

### File con prefisso nel nome → visibilità condizionata

| Prefisso | Local dev | Staging | Produzione |
|----------|:---------:|:-------:|:----------:|
| *(nessuno)* | ✓ | ✓ | ✓ |
| `__` | ✓ | ✓ | ✗ |
| `_` | ✓ | ✗ | ✗ |

**`__articolo.md`** — bozza in revisione: visibile in locale e su staging per poterla leggere nel sito reale prima di pubblicare. Non va in produzione finché non si rimuove il prefisso.

**`_articolo.md`** — appunto locale: visibile solo in locale. Non va in staging né in produzione. Utile per tenere testi in lavorazione sul proprio computer senza che entrino nel flusso di review.

## Come funziona tecnicamente

Il filtro è implementato in `.eleventy.js` come preprocessor (`draft-and-layout-filter`) che viene applicato a tutti i file `.md` prima della build. Il preprocessor restituisce `false` (esclusione) in base a queste condizioni:

- nessun `layout` nel front matter → escluso sempre
- nome inizia con `__` e non siamo in locale né in staging → escluso
- nome inizia con `_` (singolo) e non siamo in locale → escluso

L'ambiente è determinato dalle variabili d'ambiente:
- `DEV=true` → locale
- `PATH_PREFIX=/preview` → staging
- nessuna delle due → produzione

Oltre al preprocessor, tutte le collections (`blog`, `blogEn`, `approach`, `approachEn`) applicano lo stesso filtro tramite l'helper `isDraftVisible(basename)`, in modo che i file esclusi non compaiano nemmeno negli indici.

## Workflow tipico per una bozza

1. Creo il file con prefisso `__`, ad esempio `__nuovo-articolo.md`
2. Lo sviluppo in locale: visibile su `localhost:8080`
3. Faccio `git staging`: appare su staging per una lettura finale nel sito reale
4. Quando sono soddisfatto, rinomino il file togliendo `__`
5. Faccio `git publish`: il file va in produzione come articolo normale

## Vincoli

- Il prefisso `__` deve essere sul **nome del file**, non sulla cartella
- Un file `__bozza.en.md` segue le stesse regole del corrispettivo italiano
- Il prefisso non modifica il permalink: se il file ha un `permalink` nel front matter, quello viene rispettato negli ambienti in cui il file è visibile
