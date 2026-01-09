# ⚡ Quick Fix: Database Error

## Het Probleem

Je ziet deze error:
```
code: 'ECONNREFUSED'
Error setting up database
```

**Betekenis:** MySQL draait niet of is niet bereikbaar.

---

## ✅ Snel Oplossen

### Optie 1: Laravel Herd (Als je Herd gebruikt)

1. **Open Laravel Herd applicatie**
2. **Klik op "Services" tab**
3. **Zet MySQL aan** (toggle switch)

Dat is het! MySQL zou nu moeten draaien.

### Optie 2: MySQL via Homebrew Installeren

```bash
# Installeer MySQL
brew install mysql

# Start MySQL
brew services start mysql

# Check status
brew services list | grep mysql
```

### Optie 3: XAMPP/MAMP

1. Open XAMPP/MAMP
2. Start MySQL via het control panel
3. Check of poort 3306 beschikbaar is

---

## 🧪 Test of MySQL Nu Draait

```bash
# Check MySQL status
./check-mysql.sh

# Of test direct
mysql -u root -p
```

Als MySQL werkt, zou je een MySQL prompt moeten zien of een wachtwoord moeten kunnen invoeren.

---

## 📝 Database Aanmaken

Na het starten van MySQL:

```bash
mysql -u root -p
```

Dan in MySQL:
```sql
CREATE DATABASE nodejs_api;
EXIT;
```

**Let op:** Als je MySQL geen wachtwoord heeft, druk gewoon Enter bij het wachtwoord prompt.

---

## 🔄 Herstart Server

Na MySQL te hebben gestart:

1. **Stop je huidige Node.js server:** `Ctrl + C`
2. **Start opnieuw:** `npm start`
3. **Je zou nu moeten zien:**
   ```
   Server draait op http://localhost:3000
   Database tables created successfully  ✅
   ```

---

## ⚙️ .env Check

Als je nog steeds problemen hebt, check je `.env` bestand:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          # Leeg als je geen wachtwoord hebt
DB_NAME=nodejs_api
DB_PORT=3306
```

**Belangrijk:** 
- Laat `DB_PASSWORD` leeg als MySQL geen wachtwoord heeft
- Als je Laravel Herd gebruikt en MySQL heeft een wachtwoord, gebruik dat wachtwoord

---

## ✅ Checklist

- [ ] MySQL draait (check via Herd/Homebrew/XAMPP)
- [ ] Database `nodejs_api` bestaat (maak aan als nodig)
- [ ] `.env` bestand heeft correcte instellingen
- [ ] Server herstart na MySQL start
- [ ] Zie "Database tables created successfully" in console

---

## 🆘 Nog Steeds Problemen?

1. Check `DATABASE_SETUP.md` voor uitgebreide instructies
2. Test MySQL connectie: `mysql -u root -p`
3. Check of poort 3306 gebruikt wordt: `lsof -i :3306`
4. Herstart je computer (soms helpt dit)


