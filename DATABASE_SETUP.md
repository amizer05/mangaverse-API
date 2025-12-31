# 🗄️ Database Setup Instructies

## Het Probleem

Je krijgt een `ECONNREFUSED` error. Dit betekent dat MySQL niet draait of niet bereikbaar is.

```
code: 'ECONNREFUSED'
```

---

## ✅ Oplossingen

### Oplossing 1: MySQL Starten (als je MySQL hebt geïnstalleerd)

#### Via Homebrew:
```bash
brew services start mysql
```

#### Via systeem service:
```bash
# macOS met LaunchDaemon
sudo launchctl load -w /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist

# Of start MySQL service handmatig via System Preferences
```

### Oplossing 2: Laravel Herd (als je Herd gebruikt)

Als je Laravel Herd gebruikt voor je Laravel project:

1. **Check of MySQL draait in Herd:**
   - Open Laravel Herd applicatie
   - Kijk of MySQL service actief is

2. **Start MySQL via Herd:**
   - Klik op "Services" in Herd
   - Zet MySQL aan

3. **Check poort:**
   - Herd gebruikt vaak poort 3306 voor MySQL
   - Check je `.env` bestand

### Oplossing 3: XAMPP/MAMP (als je die gebruikt)

Als je XAMPP of MAMP gebruikt:

1. Start XAMPP/MAMP
2. Start MySQL service via het control panel
3. Check de poort (vaak 3306, maar kan verschillen)

### Oplossing 4: MySQL Installeren

Als je MySQL nog niet hebt:

#### Via Homebrew (macOS):
```bash
brew install mysql
brew services start mysql
```

#### Via MySQL Installer:
1. Download van: https://dev.mysql.com/downloads/mysql/
2. Volg de installatie instructies
3. Start MySQL service

---

## 📝 Database Aanmaken

Nadat MySQL draait, maak de database aan:

### Methode 1: Via MySQL Command Line

```bash
mysql -u root -p
```

Dan in MySQL:
```sql
CREATE DATABASE nodejs_api;
EXIT;
```

### Methode 2: Via phpMyAdmin (als je XAMPP/MAMP gebruikt)

1. Open phpMyAdmin (meestal `http://localhost/phpmyadmin`)
2. Klik op "New" of "Nieuw"
3. Database naam: `nodejs_api`
4. Klik "Create"

---

## ⚙️ .env Configuratie Check

Zorg dat je `.env` bestand de juiste instellingen heeft:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=je_wachtwoord_hier
DB_NAME=nodejs_api
DB_PORT=3306
PORT=3000
```

**Belangrijke checks:**
- Als MySQL geen wachtwoord heeft, laat `DB_PASSWORD` leeg
- Als MySQL op een andere poort draait, pas `DB_PORT` aan
- Als je via Herd/XAMPP werkt, check of poort 3306 klopt

---

## 🧪 Test Database Connectie

Test of MySQL bereikbaar is:

```bash
# Test connectie (zonder wachtwoord)
mysql -u root

# Test connectie (met wachtwoord)
mysql -u root -p

# Test specifieke database
mysql -u root -p nodejs_api
```

Als dit werkt, dan is MySQL bereikbaar!

---

## 🔍 Troubleshooting

### "Access denied for user 'root'@'localhost'"

Dit betekent dat je wachtwoord verkeerd is of dat je geen root toegang hebt.

**Oplossing:**
1. Check je `.env` bestand voor `DB_PASSWORD`
2. Probeer met een andere user (bijv. je systeem gebruiker)
3. Of reset MySQL root wachtwoord

### "Unknown database 'nodejs_api'"

De database bestaat nog niet.

**Oplossing:**
```sql
CREATE DATABASE nodejs_api;
```

### "Can't connect to MySQL server"

MySQL draait niet.

**Oplossing:**
- Start MySQL service
- Check of MySQL op de juiste poort draait
- Check firewall instellingen

---

## 💡 Quick Check Script

Je kunt deze commando's gebruiken om te checken:

```bash
# Check of MySQL draait (macOS met Homebrew)
brew services list | grep mysql

# Check of MySQL poort open is
lsof -i :3306

# Check MySQL process
ps aux | grep mysql
```

---

## 📌 Na Setup

Nadat je MySQL hebt gestart en de database hebt aangemaakt:

1. **Herstart je Node.js server:**
   ```bash
   # Stop huidige server (Ctrl+C)
   npm start
   ```

2. **Je zou nu moeten zien:**
   ```
   Server draait op http://localhost:3000
   Database tables created successfully
   ```

3. **Test je API:**
   ```bash
   curl http://localhost:3000/api/users
   ```

---

## 🔗 Dezelfde Database als Laravel

De opdracht zegt dat je dezelfde database mag gebruiken als je Laravel project!

Als je Laravel al draait en een database hebt:

1. Gebruik dezelfde database naam in `.env`
2. Of gebruik een aparte database: `nodejs_api`
3. Beide kunnen naast elkaar draaien met dezelfde MySQL server

Voorbeeld Laravel `.env`:
```env
DB_DATABASE=laravel_db
```

Node.js `.env` kan dan zijn:
```env
DB_NAME=nodejs_api  # Of laravel_db als je dezelfde wilt gebruiken
```


