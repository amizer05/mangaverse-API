# 🗄️ Database Setup Instructies

## Probleem: Database Connection Error

Je krijgt de fout: `ECONNREFUSED 127.0.0.1:3306`

Dit betekent dat MySQL niet draait of niet bereikbaar is.

## Oplossing 1: MySQL Installeren via Homebrew (Aanbevolen)

```bash
# Installeer MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Maak de database aan
mysql -u root -e "CREATE DATABASE IF NOT EXISTS mangaverse;"

# Controleer of het werkt
mysql -u root -e "SHOW DATABASES;" | grep mangaverse
```

## Oplossing 2: MySQL via Laravel Herd

Als je Laravel Herd gebruikt, kan MySQL daaronder draaien:

1. Open Herd applicatie
2. Ga naar Settings → Services
3. Zorg dat MySQL/MariaDB is ingeschakeld
4. Start de service

## Oplossing 3: Gebruik Bestaande MySQL Installatie

Als je al MySQL hebt geïnstalleerd maar niet via Homebrew:

```bash
# Zoek waar MySQL is geïnstalleerd
which mysql
which mysqld

# Start MySQL handmatig (pad kan verschillen)
sudo /usr/local/mysql/support-files/mysql.server start
# OF
sudo launchctl load -w /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist
```

## Database Aanmaken

Zodra MySQL draait:

```bash
# Connecteer als root (geen wachtwoord)
mysql -u root

# Maak database aan
CREATE DATABASE IF NOT EXISTS mangaverse;

# Controleer
SHOW DATABASES;

# Exit
EXIT;
```

## Test Database Connectie

```bash
# Test vanuit terminal
mysql -u root -e "USE mangaverse; SHOW TABLES;"

# Als je mangas en news tabellen ziet, werkt het!
```

## .env Configuratie

Zorg dat je `.env` in `manga-api/.env` correct is:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=          # Leeg als je geen wachtwoord hebt
DB_DATABASE=mangaverse
```

## Troubleshooting

**MySQL draait niet:**
```bash
# Check of MySQL draait
lsof -i :3306

# Start MySQL
brew services start mysql
```

**Database bestaat niet:**
```bash
mysql -u root -e "CREATE DATABASE mangaverse;"
```

**Toegang geweigerd:**
- Controleer of je geen wachtwoord nodig hebt (leeg in .env)
- Of gebruik: `mysql -u root -p` en voer wachtwoord in

**Herd MySQL:**
- Herd gebruikt soms een andere poort of socket
- Check Herd settings voor de juiste MySQL configuratie


