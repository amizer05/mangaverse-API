# 🚀 Server Starten - Quick Reference

## Node.js Server Starten

Dit is een **Node.js** project, geen Laravel project!

### Basis Commando's

```bash
# Server starten
npm start

# Server starten met auto-reload (voor development)
npm run dev
```

### Stop Server

Druk op `Ctrl + C` in de terminal waar de server draait.

---

## Check of Server Draait

```bash
# Check poort 3000
curl http://localhost:3000/

# Of in browser openen:
# http://localhost:3000/
```

---

## Verschil met Laravel

| Laravel (PHP) | Node.js (Dit project) |
|--------------|----------------------|
| `php artisan serve` | `npm start` |
| `composer install` | `npm install` |
| `.env` configuratie | `.env` configuratie |
| Database: MySQL | Database: MySQL |

---

## Troubleshooting

### "Port already in use"
Als poort 3000 al in gebruik is:

```bash
# Stop proces op poort 3000
lsof -ti:3000 | xargs kill -9

# Of gebruik andere poort in .env:
PORT=3001
```

### "Cannot find module"
```bash
# Installeer dependencies
npm install
```

### Database errors
Check je `.env` bestand en zorg dat:
- MySQL draait
- Database bestaat: `CREATE DATABASE nodejs_api;`
- Credentials kloppen


