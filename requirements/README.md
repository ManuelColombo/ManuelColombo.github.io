# Sito multilingue — panoramica

## Cosa voglio ottenere

Scrivo in italiano. Quando pubblico, il sito deve esistere anche in inglese.
Non voglio gestire due versioni dei contenuti a mano.
Voglio però poter leggere la traduzione inglese e correggerla prima che vada in produzione, se la prosa non mi convince.

## Vincoli che non cambiano

- I file sorgente restano in italiano, nella struttura attuale (`blog/`, `approach/`, ecc.)
- Il workflow di pubblicazione è già definito: `git staging` per la preview, `git publish` per la produzione
- Non voglio dipendenze fragili: se il servizio di traduzione è irraggiungibile, il sito non deve rompersi

## Decisioni aperte (da risolvere nei documenti collegati)

1. **Quando avviene la traduzione?**
   Vedi → [flusso-traduzione.md](./flusso-traduzione.md)

2. **Come sono strutturati i file tradotti?**
   Vedi → [architettura-contenuti.md](./architettura-contenuti.md)

3. **Come controllo la qualità della prosa inglese?**
   Vedi → [controllo-qualita.md](./controllo-qualita.md)

4. **Come si presenta la navigazione tra le lingue?**
   Vedi → [navigazione-lingue.md](./navigazione-lingue.md)

## Principio guida

La traduzione automatica è un punto di partenza, non il risultato finale.
Il sistema deve rendere facile intervenire sulla traduzione, non invisibile.
