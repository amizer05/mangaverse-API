# 🎬 SCREENCAST QUICK START - 10 MINUTEN

**Tijdschema:** Nu → 10 minuten klaar → Klaar voor opname!

---

## ✅ STAP 1: Terminal & Server (1 min) - ✅ KLAAR

```bash
cd /Users/aminezerouali/Herd/node.js/mangaverse-API
npm start
```

**Status:** ✅ Server draait op http://localhost:3000

---

## ✅ STAP 2: Browser HTML Docs (30 sec) - ✅ KLAAR

**Browser:** http://localhost:3000

**Status:** ✅ HTML documentatie laadt

---

## 📋 STAP 3: Thunder Client Environment (1 min)

**Handmatig in VS Code:**

1. **Open Thunder Client** (VS Code extension)
2. **Klik op GLOBE icoon** (Environment) in sidebar
3. **New Environment** → Naam: `Demo`
4. **Voeg toe:**
   - `base_url` = `http://localhost:3000`
   - `token` = `(leeg)`
5. **Save** → **Selecteer "Demo"**

**Zie:** `THUNDER_CLIENT_SETUP.md` voor details

---

## 📋 STAP 4: Collection + 10 Requests (5 min)

**Handmatig in Thunder Client:**

### **New Collection → "🎬 Screencast Demo"**

**Alle requests staan in:** `THUNDER_CLIENT_SETUP.md`

**Quick Copy-Paste:**

1. **GET Mangas**
   - GET `{{base_url}}/mangas`

2. **POST Register**
   - POST `{{base_url}}/auth/register`
   - Body: `{"email":"demo@test.com","password":"demo123","role":"admin"}`

3. **POST Login**
   - POST `{{base_url}}/auth/login`
   - Body: `{"email":"demo@test.com","password":"demo123"}`
   - ⚠️ **Kopieer token → plak in Environment → token veld**

4. **POST Manga ✅**
   - POST `{{base_url}}/mangas`
   - Headers: `Authorization: Bearer {{token}}`
   - Body: `{"title":"Naruto","description":"Ninja story","release_date":"2002-09-21"}`

5. **Validatie ❌**
   - POST `{{base_url}}/mangas`
   - Headers: `Authorization: Bearer {{token}}`
   - Body: `{"title":"Naruto 1 ❌","description":"Error","release_date":"2020-01-01"}`

6. **Paginatie**
   - GET `{{base_url}}/mangas?limit=2&offset=0`

7. **Zoeken**
   - GET `{{base_url}}/mangas?search=naruto`

8. **Relaties**
   - GET `{{base_url}}/mangas/1`

9. **POST News**
   - POST `{{base_url}}/news`
   - Headers: `Authorization: Bearer {{token}}`
   - Body: `{"title":"Ch100","content":"Chapter 100! Long enough text for validation minimum 20 characters.","category":"action","manga_id":1}`

10. **DELETE Admin**
    - DELETE `{{base_url}}/mangas/1`
    - Headers: `Authorization: Bearer {{token}}`

**Test alles eerst:** Run `./test-all-requests.sh` om te verifiëren

---

## ✅ STAP 5: GitHub (1 min) - ✅ KLAAR

**URL:** https://github.com/amizer05/mangaverse-API

**Status:** ✅ Repository is up-to-date

---

## 🎥 STAP 6: OPNAME (5 min)

**START RECORDING**

**Script:**
```
"Hallo, dit is mijn MangaVerse API project voor Project 2 - Node.js.

[Terminal tonen] npm start - server draait, database verbinding succesvol.

[Browser tonen] Op de root endpoint heb ik een volledige HTML documentatie.

[Thunder Client tonen] Ik ga nu 10 demo requests tonen:

1️⃣ GET Mangas - lijst alle mangas met paginatie metadata
2️⃣ POST Register - maak admin user aan
3️⃣ POST Login - krijg JWT token
4️⃣ POST Manga - maak nieuwe manga aan met authenticatie
5️⃣ Validatie error - toon dat title met cijfers wordt geweigerd
6️⃣ Paginatie - limit en offset werken correct
7️⃣ Zoeken - search parameter werkt op meerdere velden
8️⃣ Relaties - manga toont gerelateerde news items
9️⃣ POST News - maak news item aan met validatie
🔟 DELETE Admin - alleen admin kan verwijderen

[GitHub tonen] Dit is mijn GitHub repository met complete README.

Alle minimumvereisten zijn geïmplementeerd:
✅ Twee CRUD entiteiten
✅ Validatie
✅ Paginatie met limit en offset
✅ Zoekfunctie
✅ HTML documentatie

Extra features:
✅ JWT authenticatie
✅ Relaties tussen entiteiten
✅ Sorteren
✅ Geavanceerde validatie"
```

**STOP RECORDING**

---

## ✅ CHECKLIST VOOR OPNAME

- [ ] Server draait (npm start)
- [ ] Database verbonden
- [ ] Browser op http://localhost:3000 (HTML docs)
- [ ] Thunder Client environment "Demo" aangemaakt
- [ ] Token gekopieerd naar environment
- [ ] Alle 10 requests aangemaakt en getest
- [ ] GitHub repository open
- [ ] Recording software klaar
- [ ] Microfoon getest

---

## 🚀 KLAAR VOOR OPNAME!

**Alles is voorbereid. Start je recording en volg het script!**
