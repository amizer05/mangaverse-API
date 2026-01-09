# ✅ Opdracht Verificatie - Mangaverse API

## Ja, dit is je opdracht!

`http://localhost:3000/` is je **Mangaverse API** die voldoet aan alle vereisten van de opdracht.

---

## ✅ Alle Minimumvereisten Geïmplementeerd

### 1. ✅ Twee CRUD Interfaces

**Users Entiteit:**
- ✅ `GET /api/users` - Lijst van alle gebruikers
- ✅ `GET /api/users/:id` - Details van één gebruiker
- ✅ `POST /api/users` - Nieuwe gebruiker toevoegen
- ✅ `PUT /api/users/:id` - Gebruiker bijwerken
- ✅ `PATCH /api/users/:id` - Gebruiker bijwerken
- ✅ `DELETE /api/users/:id` - Gebruiker verwijderen

**Mangas Entiteit:**
- ✅ `GET /api/mangas` - Lijst van alle manga's
- ✅ `GET /api/mangas/:id` - Details van één manga
- ✅ `POST /api/mangas` - Nieuwe manga toevoegen
- ✅ `PUT /api/mangas/:id` - Manga bijwerken
- ✅ `PATCH /api/mangas/:id` - Manga bijwerken
- ✅ `DELETE /api/mangas/:id` - Manga verwijderen

### 2. ✅ Basisvalidatie

- ✅ Velden mogen niet leeg zijn (`validateNotEmpty`)
- ✅ Numerieke velden accepteren geen strings (`validateNumeric`)
- ✅ Voornaam kan geen cijfers bevatten (regex: `/[^a-zA-ZÀ-ÿ\s'-]/`)
- ✅ E-mail validatie (regex pattern)
- ✅ Lengte restricties

### 3. ✅ Paginatie met Limit en Offset

- ✅ `GET /api/users?limit=10&offset=20`
- ✅ `GET /api/mangas?limit=10&offset=20`

### 4. ✅ Zoek-endpoints

**Users:**
- ✅ `GET /api/users?name=amine` (zoeken op naam)
- ✅ `GET /api/users?email=test@example.com` (zoeken op email)
- ✅ `GET /api/users?role=admin` (filteren op rol)

**Mangas:**
- ✅ `GET /api/mangas?title=naruto` (zoeken op titel)
- ✅ `GET /api/mangas?genre=Action` (zoeken op genre)
- ✅ `GET /api/mangas?status=ongoing` (filteren op status)

### 5. ✅ Documentatiepagina op Root

- ✅ `GET /` geeft een HTML pagina
- ✅ Beschrijft alle endpoints
- ✅ Toont parameters en voorbeelden
- ✅ Toont response voorbeelden
- ✅ Correct opgebouwde HTML structuur

---

## ✅ Extra Features (voor hoger cijfer)

### 1. ✅ Geavanceerde Validatie

- ✅ Datum validatie: `end_date` moet na `start_date` liggen
- ✅ Telefoonnummer formaat: `+32 XXX XX XX XX`
- ✅ Lengte restricties (min/max)
- ✅ Regex validatie voor namen
- ✅ Unieke waarden (email moet uniek zijn)
- ✅ Rating validatie (0-10)

### 2. ✅ Verbeterde Query-mogelijkheden

- ✅ Zoeken op meerdere velden tegelijk
  - Users: `?name=test&email=test&role=admin`
  - Mangas: `?title=naruto&genre=Action&status=completed`
- ✅ Sorteren: `?sort=created_at&order=DESC`
- ✅ Combinatie van filteren, sorteren en paginatie
- ✅ Min/max rating filtering

---

## ✅ Technische Requirements

### 1. ✅ Node.js versie 20 of later
- Getest met Node.js v22.19.0

### 2. ✅ Express framework
- express ^4.18.2 geïnstalleerd en gebruikt

### 3. ✅ Database gekoppeld
- MySQL database
- mysql2 package voor connecties
- Connection pooling geïmplementeerd
- Automatische tabel creatie

### 4. ✅ Correcte HTTP-verbs
- GET gebruikt voor ophalen
- POST gebruikt voor aanmaken
- PUT gebruikt voor volledige update
- PATCH gebruikt voor gedeeltelijke update
- DELETE gebruikt voor verwijderen

### 5. ✅ Git en GitHub

- ✅ `.gitignore` bevat `node_modules/`
- ✅ `.env` is in `.gitignore`
- ✅ README.md aanwezig met:
  - ✅ Installatie-instructies
  - ✅ Stappen om project te laten werken
  - ✅ Bronvermelding
  - ✅ Extra informatie

---

## 📋 Wat je nog moet doen voor inzending:

### 1. ⏳ Git Repository Setup

```bash
# Initialiseer git repository
git init

# Voeg alle bestanden toe
git add .

# Maak eerste commit
git commit -m "Initial commit: Mangaverse API - Node.js backend met volledige CRUD voor Users en Mangas"

# Maak repository aan op GitHub
# Ga naar https://github.com/new
# Maak nieuwe repository aan (bijv. "mangaverse-api")

# Push naar GitHub
git remote add origin <jouw-github-url>
git branch -M main
git push -u origin main
```

### 2. ⏳ Screencast Opnemen

Demonstreer:
- ✅ Documentatie pagina (`http://localhost:3000/`)
- ✅ User aanmaken (POST /api/users)
- ✅ User ophalen (GET /api/users/:id)
- ✅ Zoeken (GET /api/users?name=...)
- ✅ Paginatie (GET /api/users?limit=5&offset=0)
- ✅ Manga toevoegen (POST /api/mangas)
- ✅ Manga's filteren (GET /api/mangas?genre=Action)
- ✅ Validatie (foutieve data proberen)
- ✅ Update (PUT /api/users/:id)
- ✅ Delete (DELETE /api/users/:id)

**Vermeld tijdens screencast:**
- "Dit zijn alle minimumvereisten"
- "Dit zijn mijn extra features: [geavanceerde validatie, zoeken op meerdere velden, sorteren, etc.]"

### 3. ⏳ Inleveren op Canvas

- ✅ Lever de website-URL in (lokaal of deployed)
- ✅ Plaats GitHub repo link als comment
- ✅ Upload screencast

### 4. ⏳ Optioneel: Deploy API

Voor een hoger cijfer kun je de API deployen:
- Heroku
- Railway
- Render
- DigitalOcean

---

## 🎯 Conclusie

**JA, dit is je opdracht!** 

Je API voldoet aan:
- ✅ Alle **minimumvereisten** (10-12/20)
- ✅ Meerdere **extra features** (voor hoger cijfer)
- ✅ Alle **technische requirements**

**Je project is compleet en klaar voor inzending!** 🎉

---

## 📖 Handige Bestanden

- `README.md` - Volledige documentatie
- `CHECKLIST.md` - Overzicht van alle features
- `HOE_TESTEN.md` - Test instructies
- `DATABASE_SETUP.md` - Database setup help
- `QUICK_FIX.md` - Snelle oplossingen

