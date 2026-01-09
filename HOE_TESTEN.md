# 🧪 Hoe Test Je Je API?

## Quick Start

### 1. Server Starten

Zorg eerst dat je server draait:

```bash
npm start
```

Of voor development met auto-reload:

```bash
npm run dev
```

De server moet draaien op `http://localhost:3000` (of je geconfigureerde poort).

---

## 📋 Test Methodes

### Methode 1: Test Script (Aanbevolen)

We hebben een test script voor je gemaakt:

```bash
./test-api.sh
```

Dit script test automatisch alle belangrijke endpoints en geeft je direct feedback.

**Let op:** Zorg dat je `jq` hebt geïnstalleerd voor JSON parsing:
```bash
# macOS
brew install jq

# Linux
sudo apt-get install jq
```

---

### Methode 2: Browser Testen

#### Documentatie Pagina
Open in je browser:
```
http://localhost:3000/
```

Je zou een mooie documentatiepagina moeten zien met alle endpoints.

#### GET Requests
Je kunt GET endpoints direct in de browser testen:
- `http://localhost:3000/api/users`
- `http://localhost:3000/api/mangas`
- `http://localhost:3000/api/users/1`
- `http://localhost:3000/api/mangas/1`

---

### Methode 3: cURL Commando's

#### Test 1: Server Status Check
```bash
curl http://localhost:3000/
```
Moet HTML teruggeven (de documentatie pagina).

#### Test 2: Alle Users Ophalen
```bash
curl http://localhost:3000/api/users
```

#### Test 3: User Aanmaken
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Amine",
    "last_name": "Zerouali",
    "email": "amine@example.com",
    "phone": "+32 444 44 44 44",
    "role": "admin"
  }'
```

**Verwacht resultaat:** Status code 201 met JSON response met nieuwe user data.

#### Test 4: Specifieke User Ophalen
```bash
curl http://localhost:3000/api/users/1
```
(Vervang 1 met het ID van je aangemaakte user)

#### Test 5: Zoeken op Naam
```bash
curl "http://localhost:3000/api/users?name=Amine"
```

#### Test 6: Paginatie
```bash
curl "http://localhost:3000/api/users?limit=5&offset=0"
```

#### Test 7: Manga Toevoegen
Eerst een user ID nodig. Vervang `1` met een bestaand user ID:

```bash
curl -X POST http://localhost:3000/api/mangas \
  -H "Content-Type: application/json" \
  -d '{
    "title": "One Piece",
    "description": "Het verhaal volgt Monkey D. Luffy en zijn piratencrew op hun zoektocht naar de One Piece schat.",
    "genre": "Action",
    "status": "ongoing",
    "rating": 9.8,
    "release_date": "1997-07-22",
    "added_by_id": 1
  }'
```

#### Test 8: Manga's Ophalen met Filtering
```bash
# Zoeken op titel
curl "http://localhost:3000/api/mangas?title=One"

# Filteren op genre
curl "http://localhost:3000/api/mangas?genre=Action"

# Filteren op status
curl "http://localhost:3000/api/mangas?status=ongoing"

# Sorteren op rating
curl "http://localhost:3000/api/mangas?sort=rating&order=DESC"

# Combinatie
curl "http://localhost:3000/api/mangas?genre=Action&status=ongoing&sort=rating&order=DESC&limit=10"
```

#### Test 9: User Bijwerken (PUT)
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Updated",
    "email": "updated@example.com"
  }'
```

#### Test 10: Validatie Testen (moet fouten geven)

**Lege voornaam (moet 400 geven):**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "",
    "last_name": "Test",
    "email": "test@example.com"
  }'
```

**Ongeldig email (moet 400 geven):**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "geen-email"
  }'
```

**Cijfers in naam (moet 400 geven):**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test123",
    "last_name": "User",
    "email": "test@example.com"
  }'
```

**Ongeldig telefoonnummer (moet 400 geven):**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com",
    "phone": "123456"
  }'
```

#### Test 11: User Verwijderen
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

#### Test 12: Manga Verwijderen
```bash
curl -X DELETE http://localhost:3000/api/mangas/1
```

---

### Methode 4: Postman (GUI Tool)

1. Download Postman: https://www.postman.com/downloads/
2. Maak een nieuwe Collection aan genaamd "Mangaverse API"
3. Voeg requests toe voor elke endpoint

**Voorbeeld request setup:**
- Method: POST
- URL: `http://localhost:3000/api/users`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "first_name": "Amine",
  "last_name": "Zerouali",
  "email": "amine@example.com",
  "phone": "+32 444 44 44 44",
  "role": "admin"
}
```

---

## ✅ Checklist: Wat Moet Werken?

### Basis Functionaliteit
- [ ] Server start zonder errors
- [ ] Documentatie pagina laadt op `/`
- [ ] GET `/api/users` geeft response (200 of lege lijst)
- [ ] GET `/api/mangas` geeft response (200 of lege lijst)

### CRUD Operaties - Users
- [ ] POST `/api/users` maakt nieuwe user aan (201)
- [ ] GET `/api/users/:id` haalt specifieke user op (200)
- [ ] PUT `/api/users/:id` werkt user bij (200)
- [ ] DELETE `/api/users/:id` verwijdert user (200)

### CRUD Operaties - Mangas
- [ ] POST `/api/mangas` voegt nieuwe manga toe (201)
- [ ] GET `/api/mangas/:id` haalt specifieke manga op (200)
- [ ] PUT `/api/mangas/:id` werkt manga bij (200)
- [ ] DELETE `/api/mangas/:id` verwijdert manga (200)

### Validatie
- [ ] Lege velden worden afgewezen (400)
- [ ] Ongeldige email wordt afgewezen (400)
- [ ] Cijfers in naam worden afgewezen (400)
- [ ] Ongeldig telefoonnummer wordt afgewezen (400)
- [ ] Numerieke velden accepteren geen strings (400)

### Query Features
- [ ] Zoeken op naam werkt (`?name=test`)
- [ ] Paginatie werkt (`?limit=10&offset=0`)
- [ ] Sorteren werkt (`?sort=created_at&order=DESC`)
- [ ] Filteren op genre werkt (`?genre=Action`)
- [ ] Combinatie van filters werkt

### Error Handling
- [ ] 404 voor niet-bestaande resources
- [ ] 400 voor validatiefouten
- [ ] 201 voor succesvol aanmaken
- [ ] 200 voor succesvol ophalen/bijwerken

---

## 🐛 Troubleshooting

### "Cannot connect to server"
- Check of server draait: `npm start`
- Check of poort 3000 beschikbaar is
- Check `.env` bestand voor correcte poort

### "Database connection error"
- Check of MySQL draait
- Check `.env` bestand voor correcte database credentials
- Maak database aan: `CREATE DATABASE nodejs_api;`

### "404 Not Found"
- Check of je de juiste URL gebruikt
- Check of routes correct zijn geladen in server.js

### "400 Bad Request"
- Dit is normaal voor validatiefouten
- Check je request body data
- Check validatie regels in README.md

---

## 📝 Test Voorbeelden voor Screencast

Voor je screencast, toon deze in volgorde:

1. **Server starten** en documentatie pagina tonen
2. **User aanmaken** (POST /api/users)
3. **User ophalen** (GET /api/users/:id)
4. **Zoeken** (GET /api/users?name=...)
5. **Paginatie** (GET /api/users?limit=5&offset=0)
6. **Manga toevoegen** (POST /api/mangas)
7. **Manga's filteren** (GET /api/mangas?genre=Action&status=ongoing)
8. **Validatie tonen** (foutieve data proberen)
9. **Update** (PUT /api/users/:id of /api/mangas/:id)
10. **Delete** (DELETE /api/users/:id of /api/mangas/:id)

Vermeld tijdens de screencast:
- "Dit zijn alle minimumvereisten"
- "Dit zijn mijn extra features: [geavanceerde validatie, zoeken op meerdere velden, sorteren, etc.]"


