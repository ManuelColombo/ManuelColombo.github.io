# Flusso di traduzione

## Quando tradurre?

Ci sono tre momenti possibili in cui la traduzione può avvenire:

### A. A build time (durante `npm run build`)
Ogni volta che il sito viene compilato, uno script chiama l'API di traduzione per ogni file italiano che non ha ancora un corrispondente inglese.

**Pro:** automatico, non ci devo pensare.
**Contro:** la build diventa lenta e dipendente da una connessione e da un'API. Se l'API è down, la build si rompe — o peggio, pubblica contenuto a metà.

### B. Come script separato (`npm run translate`)
La traduzione è un passaggio esplicito che lancio quando voglio, prima di fare staging o publish.

**Pro:** controllo totale. Posso tradurre, leggere il risultato, editarlo, e poi pubblicare.
**Contro:** richiede un passaggio manuale che potrei dimenticare.

### C. In GitHub Actions, sul branch `Local_writing` (staging)
Il workflow di staging lancia automaticamente lo script di traduzione. I file `.en.md` generati vengono committati sul branch da GitHub Actions. Prima di fare `git publish`, posso fare `git pull` e trovare i file tradotti già pronti da rivedere.

**Pro:** automatico al momento giusto (staging, non produzione). Non blocca la build. Posso rivedere in locale prima di pubblicare.
**Contro:** GitHub Actions deve avere la chiave API come secret. Il commit automatico complica leggermente la storia git.

---

## Proposta: opzione B come default, C come upgrade futuro

Nella fase iniziale, uno script `npm run translate` che:
1. Legge tutti i file `.md` in `blog/`
2. Per ognuno, controlla se esiste già `blog/en/[stesso-slug].md`
3. Se non esiste (o se il sorgente italiano è più recente), chiama l'API e scrive il file tradotto
4. Stampa un report: file nuovi, file aggiornati, file già tradotti e invariati

L'utente può poi aprire i file `.en.md`, leggerli, correggerli, e committare.

---

## Quale API usare?

### Claude API (Anthropic)
Il vantaggio è la qualità della prosa. Claude può ricevere istruzioni stilistiche: "mantieni il tono personale e diretto, non ammorbidire le opinioni forti". Questo è rilevante per un blog in cui la voce è centrale.

### DeepL
Veloce, economico, buono per testi informativi. Meno flessibile sulle istruzioni di stile.

### Google Translate
Economico, ma la qualità della prosa è inferiore.

**Raccomandazione:** Claude API, con un prompt di sistema che definisce lo stile desiderato. Vedi [controllo-qualita.md](./controllo-qualita.md) per come strutturare il prompt.

---

## Gestione dei costi

Ogni post tradotto costa una piccola quantità di token. I post sono brevi (500–1500 parole tipicamente). Una stima: ~$0.01–0.05 per post con Claude Haiku, ~$0.05–0.20 con Sonnet.

Lo script dovrebbe evitare di ritradurre file già tradotti se il sorgente non è cambiato — confrontando data di modifica o un hash del contenuto.
