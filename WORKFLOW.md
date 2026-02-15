# 🚀 Workflow di Pubblicazione

## Comandi Git Personalizzati

### 📝 Lavora in staging (Local_writing)
```bash
git preview              # Switch a Local_writing
# ... fai modifiche ...
git staging              # Add, commit e push automatico su Local_writing
```

### 🌍 Pubblica dal staging al sito live
```bash
git publish              # Merge Local_writing → master e push (pubblica!)
```

### 🔄 Switch rapido tra branch
```bash
git preview              # Vai su Local_writing (staging)
git live                 # Vai su master (produzione)
```

## 🌐 Aree di Pubblicazione

### Area Pubblica (Master)
- **Branch**: `master`
- **URL**: https://manuelcolombo.github.io
- **Deploy**: Automatico ogni push su master

### Area di Preview (Local_writing)
- **Branch**: `Local_writing`
- **URL**: https://manuelcolombo.github.io/preview
- **Deploy**: Automatico ogni push su Local_writing

## ⚙️ Setup Iniziale GitHub Pages

**IMPORTANTE**: Devi configurare GitHub Pages una sola volta:

1. Vai su https://github.com/ManuelColombo/ManuelColombo.github.io/settings/pages
2. In "Build and deployment" → "Source" seleziona **Deploy from a branch**
3. In "Branch" seleziona:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Salva

## 📋 Workflow Tipico

### Scenario 1: Nuova bozza di blog post
```bash
git preview                    # Vai su Local_writing
# scrivi il post...
git staging                    # Push su staging
# Visita https://manuelcolombo.github.io/preview per vedere l'anteprima
git publish                    # Quando sei soddisfatto, pubblica!
```

### Scenario 2: Fix veloce in produzione
```bash
git live                       # Vai su master
# fix il bug...
git add -A
git commit -m "Fix: ..."
git push origin master         # Pubblica direttamente
```

### Scenario 3: Test locale prima di staging
```bash
git preview                    # Vai su Local_writing
npm start                      # Server locale su http://localhost:8080
# Testa in locale...
git staging                    # Push su staging quando pronto
```

## 🔧 Comandi Eleventy

```bash
npm start                      # Server di sviluppo locale (http://localhost:8080)
npm run build                  # Build del sito (output in _site/)
```

## ⚠️ Note Importanti

- **Non committare mai la cartella `_site/`** (già nel .gitignore)
- Il comando `git publish` fa automaticamente merge e torna al branch originale
- Le GitHub Actions buildano automaticamente, non serve fare `npm run build` manualmente prima del push
- Per vedere i log dei deploy: https://github.com/ManuelColombo/ManuelColombo.github.io/actions

## 🐛 Troubleshooting

### Preview non funziona?
1. Controlla che GitHub Pages sia configurato su branch `gh-pages`
2. Verifica i log delle Actions: https://github.com/ManuelColombo/ManuelColombo.github.io/actions
3. Aspetta qualche minuto dopo il primo push (il deploy può richiedere tempo)

### Conflitti durante `git publish`?
```bash
git preview
git merge master              # Risolvi conflitti prima del publish
git staging
git publish
```
