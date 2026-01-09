# 🤖 Automatisch MySQL Starten

Ik heb geprobeerd MySQL automatisch te starten, maar omdat Herd een GUI applicatie is, kan ik dit niet volledig automatisch doen.

## Wat ik heb gedaan:

1. ✅ Script gemaakt om Herd te openen: `start-mysql.sh`
2. ✅ Database setup script gemaakt: `setup-database.sh`

## 📋 Stappen om alles te laten werken:

### Stap 1: Start MySQL via Herd

**Optie A: Via GUI (Aanbevolen)**
1. Open Laravel Herd applicatie
2. Ga naar "Services" tab
3. Zet MySQL aan (toggle switch)

**Optie B: Via Script (probeert Herd te openen)**
```bash
./start-mysql.sh
```
Dit opent Herd, maar je moet nog steeds handmatig MySQL aanzetten.

### Stap 2: Database Aanmaken

Zodra MySQL draait, maak de database aan:

```bash
./setup-database.sh
```

Dit script:
- Wacht tot MySQL beschikbaar is
- Maakt de database `nodejs_api` aan
- Bevestigt dat alles werkt

### Stap 3: Server Herstarten

```bash
npm start
```

Je zou nu moeten zien:
```
Server draait op http://localhost:3000
Database tables created successfully ✅
```

---

## 🔄 Alternatief: MySQL Installeren via Homebrew

Als je liever MySQL direct via command line wilt beheren:

```bash
# Installeer MySQL
brew install mysql

# Start MySQL
brew services start mysql

# Check status
brew services list | grep mysql
```

Dan kun je MySQL altijd starten/stoppen via:
```bash
brew services start mysql
brew services stop mysql
```

---

## ✅ Quick Check

Na het starten van MySQL, check of het werkt:

```bash
# Check of MySQL draait
lsof -i :3306

# Test connectie (als mysql command beschikbaar is)
mysql -u root -e "SELECT 1"
```

Als je "1" ziet, werkt MySQL! 🎉


