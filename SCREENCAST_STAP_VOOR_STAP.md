# 🎬 SCREENCAST STAP-VOOR-STAP GUIDE

**Doel:** Demonstreer je MangaVerse API project en verdien maximaal punten  
**Duur:** 8-12 minuten  
**Project:** https://github.com/amizer05/mangaverse-API

---

## 📋 PRE-FLIGHT CHECKLIST

Voordat je begint met opnemen:

- [ ] Server start zonder errors (`npm start`)
- [ ] Database connectie werkt (MySQL draait)
- [ ] Test user aangemaakt (admin@test.com / test123)
- [ ] JWT token werkt
- [ ] Alle endpoints getest
- [ ] HTML documentatie laadt op http://localhost:3000
- [ ] GitHub repository klaar en up-to-date
- [ ] Postman/Thunder Client klaar
- [ ] Screencast software klaar (OBS/QuickTime)
- [ ] Microfoon getest

---

## 🎥 SCREENCAST SCRIPT

### **DEEL 1: INTRODUCTIE (1 minuut)**

#### 1.1 Project Overzicht
```
[Toon terminal/IDE]
"Dit is mijn MangaVerse API project voor Project 2 - Node.js.
Ik heb een volledige REST API gebouwd met Express.js en MySQL."
```

#### 1.2 Project Structuur
```
[Toon file explorer]
"Het project heeft een duidelijke structuur met routes, controllers, 
middleware en models. Ik gebruik ES modules en Express.js."
```

---

### **DEEL 2: SERVER STARTEN (30 seconden)**

#### 2.1 Navigeer naar Project
```bash
cd mangaverse-API
```

#### 2.2 Start Server
```bash
npm start
```

**Zeg:** "De server start nu op poort 3000. Je ziet dat de database verbinding succesvol is."

**Wacht:** Tot je ziet: "✅ Database connected successfully"

---

### **DEEL 3: ROOT HTML DOCUMENTATIE (1 minuut)**

#### 3.1 Open Browser
```
[Open browser naar http://localhost:3000]
```

**Zeg:** "Op de root endpoint heb ik een volledige HTML documentatie pagina gemaakt met alle endpoints, methoden, parameters en voorbeelden."

#### 3.2 Scroll door Documentatie
- Toon authentication endpoints
- Toon Manga endpoints
- Toon News endpoints
- Toon status codes

**Zeg:** "De documentatie is in Twilio-stijl en bevat alle informatie die developers nodig hebben."

---

### **DEEL 4: CRUD OPERATIES - MANGA (3 minuten)**

#### 4.1 GET - Lijst Alle Mangas
```
[In Postman/Thunder Client]
GET http://localhost:3000/mangas
```

**Zeg:** "Dit is de GET endpoint om alle mangas op te halen. Momenteel is de database leeg, dus we krijgen een lege lijst met paginatie metadata."

**Toon response:**
```json
{
  "data": [],
  "pagination": {
    "total": 0,
    "limit": 10,
    "offset": 0,
    "hasMore": false
  }
}
```

#### 4.2 POST - Nieuwe Manga (ZONDER TOKEN - toon error)
```
POST http://localhost:3000/mangas
Body: {
  "title": "Naruto",
  "description": "A young ninja story",
  "release_date": "2002-09-21"
}
```

**Zeg:** "Als ik probeer een manga aan te maken zonder authenticatie, krijg ik een 401 Unauthorized error. Dit toont dat de authenticatie werkt."

#### 4.3 Authenticatie - Registreren
```
POST http://localhost:3000/auth/register
Body: {
  "email": "admin@test.com",
  "password": "test123",
  "role": "admin"
}
```

**Zeg:** "Eerst registreer ik een nieuwe gebruiker met admin rechten."

#### 4.4 Authenticatie - Login
```
POST http://localhost:3000/auth/login
Body: {
  "email": "admin@test.com",
  "password": "test123"
}
```

**Zeg:** "Nu log ik in en krijg ik een JWT token terug. Ik kopieer deze token voor de volgende requests."

**Toon response met token:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### 4.5 POST - Nieuwe Manga (MET TOKEN)
```
POST http://localhost:3000/mangas
Headers: Authorization: Bearer <token>
Body: {
  "title": "Naruto",
  "description": "A young ninja story",
  "release_date": "2002-09-21"
}
```

**Zeg:** "Nu met de token kan ik succesvol een manga aanmaken. Je ziet de 201 Created status en de nieuwe manga data."

#### 4.6 POST - Validatie Error (title met cijfers)
```
POST http://localhost:3000/mangas
Headers: Authorization: Bearer <token>
Body: {
  "title": "Naruto 2",  // ← CIJFERS!
  "description": "A young ninja story",
  "release_date": "2002-09-21"
}
```

**Zeg:** "Als ik een title met cijfers probeer, krijg ik een validatie error. Dit toont dat de validatie correct werkt."

**Toon error:**
```json
{
  "error": "Validation Error",
  "errors": [
    {
      "msg": "Title cannot contain numbers",
      "param": "title"
    }
  ]
}
```

#### 4.7 POST - Validatie Error (datum in toekomst)
```
POST http://localhost:3000/mangas
Headers: Authorization: Bearer <token>
Body: {
  "title": "Future Manga",
  "description": "A story",
  "release_date": "2027-01-01"  // ← TOEKOMST!
}
```

**Zeg:** "Ook een release date in de toekomst wordt geweigerd door de geavanceerde validatie."

#### 4.8 Maak Nog 2-3 Mangas Aan
```
POST /mangas
- "One Piece"
- "Dragon Ball"
- "Bleach"
```

**Zeg:** "Ik maak nog een paar mangas aan zodat we data hebben voor de volgende demo's."

#### 4.9 GET - Detail Manga
```
GET http://localhost:3000/mangas/1
```

**Zeg:** "Met GET /mangas/:id kan ik een specifieke manga ophalen. Je ziet dat deze ook de gerelateerde news items toont, wat de relatie tussen entiteiten demonstreert."

#### 4.10 PUT - Update Manga
```
PUT http://localhost:3000/mangas/1
Headers: Authorization: Bearer <token>
Body: {
  "description": "Updated description"
}
```

**Zeg:** "Met PUT kan ik een manga updaten. Alleen de velden die ik meegeef worden geüpdatet."

#### 4.11 DELETE - Verwijder Manga (Admin)
```
DELETE http://localhost:3000/mangas/3
Headers: Authorization: Bearer <token>
```

**Zeg:** "DELETE vereist admin rechten. Als ik ingelogd ben als admin, kan ik mangas verwijderen."

---

### **DEEL 5: PAGINATIE & ZOEKEN (2 minuten)**

#### 5.1 Paginatie
```
GET http://localhost:3000/mangas?limit=2&offset=0
```

**Zeg:** "Met limit en offset kan ik paginatie implementeren. Hier vraag ik 2 resultaten vanaf offset 0."

**Toon response met paginatie metadata:**
```json
{
  "data": [...],
  "pagination": {
    "total": 5,
    "limit": 2,
    "offset": 0,
    "hasMore": true
  }
}
```

```
GET http://localhost:3000/mangas?limit=2&offset=2
```

**Zeg:** "Met offset 2 krijg ik de volgende pagina."

#### 5.2 Zoeken
```
GET http://localhost:3000/mangas?search=naruto
```

**Zeg:** "Met de search parameter kan ik zoeken in title en description. Hier zoek ik naar 'naruto'."

**Toon resultaten met matching mangas.**

#### 5.3 Sorteren
```
GET http://localhost:3000/mangas?sort=title&order=asc
```

**Zeg:** "Met sort en order kan ik de resultaten sorteren. Hier sorteer ik op title in oplopende volgorde."

```
GET http://localhost:3000/mangas?sort=release_date&order=desc
```

**Zeg:** "Of op release date in aflopende volgorde."

#### 5.4 Combinatie
```
GET http://localhost:3000/mangas?limit=5&offset=0&search=one&sort=title&order=asc
```

**Zeg:** "Ik kan alle features combineren: paginatie, zoeken en sorteren in één request."

---

### **DEEL 6: CRUD OPERATIES - NEWS (2 minuten)**

#### 6.1 POST - Nieuwe News
```
POST http://localhost:3000/news
Headers: Authorization: Bearer <token>
Body: {
  "title": "New Chapter Release",
  "content": "Chapter 1000 of Naruto is finally here with amazing action scenes!",
  "category": "action",
  "manga_id": 1
}
```

**Zeg:** "Nu maak ik een news item aan. De content moet minimaal 20 characters zijn, en de category moet een van de toegestane waarden zijn."

#### 6.2 Validatie Error - Content te kort
```
POST http://localhost:3000/news
Body: {
  "title": "Short",
  "content": "Too short",  // ← Minder dan 20 chars!
  "category": "action"
}
```

**Zeg:** "Als de content te kort is, krijg ik een validatie error."

#### 6.3 Validatie Error - Ongeldige Category
```
POST http://localhost:3000/news
Body: {
  "title": "Test",
  "content": "This is a long enough content for validation",
  "category": "invalid"  // ← Niet in enum!
}
```

**Zeg:** "Ook een ongeldige category wordt geweigerd."

#### 6.4 GET - News met Filter
```
GET http://localhost:3000/news?category=action
```

**Zeg:** "Ik kan news filteren op category."

```
GET http://localhost:3000/news?manga_id=1
```

**Zeg:** "Of op manga_id om alle news voor een specifieke manga te krijgen."

#### 6.5 GET - News met Paginatie
```
GET http://localhost:3000/news?limit=3&offset=0&sort=created_at&order=desc
```

**Zeg:** "News ondersteunt ook paginatie, sorteren en zoeken."

---

### **DEEL 7: RELATIES & EXTRA FEATURES (1 minuut)**

#### 7.1 Relaties
```
GET http://localhost:3000/mangas/1
```

**Zeg:** "Als ik een manga ophaal, zie je dat deze ook alle gerelateerde news items bevat. Dit toont de relatie tussen de entiteiten via de foreign key."

**Toon response:**
```json
{
  "data": {
    "id": 1,
    "title": "Naruto",
    ...
    "news": [
      { "id": 1, "title": "...", ... }
    ]
  }
}
```

#### 7.2 Category Filter op Mangas
```
GET http://localhost:3000/mangas?category=action
```

**Zeg:** "Ik kan ook mangas filteren op basis van de category van hun gerelateerde news items."

---

### **DEEL 8: GITHUB & README (1 minuut)**

#### 8.1 Toon GitHub Repository
```
[Open GitHub repository in browser]
https://github.com/amizer05/mangaverse-API
```

**Zeg:** "Dit is mijn GitHub repository. Je ziet dat node_modules correct is uitgesloten via .gitignore."

#### 8.2 Toon README
```
[Scroll door README.md op GitHub]
```

**Zeg:** "De README bevat volledige installatie-instructies, API documentatie, en bronvermeldingen."

**Toon:**
- Installatie sectie
- Endpoints overzicht
- Validatie regels
- Bronvermeldingen

---

### **DEEL 9: SAMENVATTING (30 seconden)**

**Zeg:** 
```
"Samenvattend heb ik een volledige REST API gebouwd met:

✅ Twee CRUD entiteiten (Manga & News)
✅ Volledige validatie met express-validator
✅ Paginatie met limit en offset
✅ Zoekfunctie op meerdere velden
✅ Sorteren van resultaten
✅ HTML documentatie op root endpoint
✅ JWT authenticatie
✅ Admin-only delete functionaliteit
✅ Relaties tussen entiteiten
✅ Geavanceerde validatie regels

Het project gebruikt Node.js v22, Express.js, en MySQL met mysql2.
Alle code is op GitHub met een complete README."
```

---

## 🎯 TECHNISCHE TIPS

### Software:
- **OBS Studio** (gratis) of **QuickTime** (Mac) of **ScreenRec** (online)
- **Postman** of **Thunder Client** (VS Code extension) voor API testing
- **Terminal** voor server commands

### Instellingen:
- **Resolutie:** 1920x1080 of 1280x720
- **Framerate:** 30fps is voldoende
- **Audio:** Zorg voor goede microfoon kwaliteit
- **Bereid voor:** Test alle requests VOOR opname

### Opname Tips:
1. **Test alles eerst** - Zorg dat alle requests werken
2. **Bereid data voor** - Maak test mangas/news VOOR opname
3. **Gebruik shortcuts** - Snel switchen tussen terminal/browser/Postman
4. **Spreek duidelijk** - Leg uit wat je doet
5. **Toon errors** - Laat zien dat validatie werkt
6. **Eén take** - Probeer in één keer, maar maak backup opnames

---

## ✅ VERWACHTE SCORE

Met deze screencast toon je:
- ✅ Alle minimumvereisten (10-12/20 punten)
- ✅ Alle extra features (6-8/20 punten)
- ✅ Goede code kwaliteit (4-6/20 punten)
- ✅ Goede presentatie (2-4/20 punten)

**Totaal: 22-30/30 punten** 🎉

---

**Succes met je screencast! 🚀**

