# 🚀 GitHub Repository Setup - Stap voor Stap

## ✅ Wat ik al heb gedaan:

1. ✅ Git repository geïnitialiseerd (`git init`)
2. ✅ Alle bestanden toegevoegd (`git add .`)
3. ✅ Eerste commit gemaakt met duidelijke commit message

---

## 📋 Volgende Stappen:

### Stap 1: GitHub Repository Aanmaken

1. **Ga naar GitHub:**
   - Open https://github.com/new in je browser
   - Of klik op het "+" icoon rechtsboven → "New repository"

2. **Vul de repository details in:**
   - **Repository name:** `mangaverse-api` (of een andere naam)
   - **Description:** `Mangaverse API - Node.js REST API voor manga catalogus beheer`
   - **Visibility:** ✅ **Public** (VERPLICHT - docent moet het kunnen zien!)
   - ❌ **NIET aanvinken:** "Add a README file" (we hebben er al een)
   - ❌ **NIET aanvinken:** "Add .gitignore" (we hebben er al een)
   - ❌ **NIET aanvinken:** "Choose a license"

3. **Klik op "Create repository"**

### Stap 2: Push naar GitHub

Nadat je de repository hebt aangemaakt, krijg je een pagina met instructies. Gebruik deze commando's:

```bash
# Voeg GitHub remote toe (VERVANG <jouw-github-url> met jouw URL)
git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/mangaverse-api.git

# Of als je SSH gebruikt:
# git remote add origin git@github.com:JOUW-GEBRUIKERSNAAM/mangaverse-api.git

# Zet default branch naar main
git branch -M main

# Push naar GitHub
git push -u origin main
```

**Belangrijk:** Vervang `JOUW-GEBRUIKERSNAAM` met jouw GitHub gebruikersnaam!

---

## 🔍 Verificatie

Na het pushen, check of alles werkt:

1. **Ga naar je GitHub repository pagina**
2. **Check of alle bestanden er zijn:**
   - ✅ server.js
   - ✅ package.json
   - ✅ README.md
   - ✅ .gitignore
   - ✅ config/
   - ✅ controllers/
   - ✅ routes/
   - ✅ middleware/

3. **Test git clone (zoals de docent zal doen):**
   ```bash
   # In een andere directory
   cd ~/Desktop
   git clone https://github.com/JOUW-GEBRUIKERSNAAM/mangaverse-api.git
   cd mangaverse-api
   npm install
   # Check of alles werkt
   ```

---

## 📝 Commit Best Practices

Voor toekomstige wijzigingen, gebruik duidelijke commit messages:

```bash
# Goede voorbeelden:
git commit -m "Add paginatie support voor manga endpoints"
git commit -m "Fix validatie bug voor telefoonnummers"
git commit -m "Update documentatie met nieuwe endpoints"
git commit -m "Add error handling voor database connectie"

# Slechte voorbeelden (niet doen):
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
```

---

## ✅ Checklist voor Inzending

- [x] Git repository geïnitialiseerd
- [x] .gitignore bevat node_modules
- [x] README.md aanwezig
- [x] Eerste commit gemaakt
- [ ] GitHub repository aangemaakt (PUBLIC!)
- [ ] Code gepusht naar GitHub
- [ ] Git clone getest
- [ ] GitHub URL klaar voor inzending

---

## 🆘 Troubleshooting

### "remote origin already exists"

Als je deze error krijgt:
```bash
git remote remove origin
git remote add origin <jouw-url>
```

### "Permission denied"

Controleer of je ingelogd bent op GitHub via de terminal, of gebruik een Personal Access Token:
- GitHub → Settings → Developer settings → Personal access tokens
- Maak nieuwe token aan met `repo` permissions
- Gebruik token als wachtwoord bij push

### "Updates were rejected"

Als je deze error krijgt:
```bash
git pull origin main --allow-unrelated-histories
# Los eventuele conflicts op
git push -u origin main
```

---

## 📌 Belangrijk voor Opdracht

De docent zal dit doen:
```bash
git clone <jouw-github-url>
```

Zorg ervoor dat:
- ✅ Repository is **PUBLIC**
- ✅ Repository kan worden gecloned zonder errors
- ✅ Na `git clone` en `npm install` werkt het project
- ✅ README.md is aanwezig en compleet

