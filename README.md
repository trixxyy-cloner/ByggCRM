# ByggCRM v2.0

En modern webbapplikation för att hantera byggprojekt och kundrelationer. Utvecklad med React, TypeScript, Tailwind CSS och Vite.

## 📋 Beskrivning

ByggCRM är ett CRM-system speciellt utformat för byggbranschen. Systemet hjälper till att organisera projekter, klientkontakter och projektidéer på ett intuitivt sätt.

### 🎯 Funktioner

- **Dashboard**: Överblick över aktiva projekt, kunder och omsättningsmetrik
- **Projekthantering**: Spåra byggprojekt med framstegsindikatorer och statistik
- **Kundhantering**: Hantera kundinformation och projekthistorik
- **Direktstatistik**: Realtidsstatistik sparad i browser localStorage
- **Responsiv design**: Fungerar sömlöst på skrivbord och mobila enheter
- **Mjuka animationer**: CSS-övergångar och hover-effekter för bättre användarupplevelse

## 🛠️ Tech Stack

- **Modern Framework**: React 18 med TypeScript
- **Build Tool**: Vite för snabb utveckling och produktion
- **Styling**: Tailwind CSS för utility-first CSS
- **State Management**: React Hooks (useState, useEffect)
- **Pakethanterare**: npm

## 📚 Förutsättningar

Se till att du har följande installerat på ditt system:

- **Node.js** (v16 eller högre) - [Ladda ner här](https://nodejs.org/)
- **npm** (kommer med Node.js)
- **Git** (för versionskontroll)

Verifiera installation:

```bash
node --version
npm --version
```

## 🚀 Installation & Inställning

### 1. Klona Repositoriet

```bash
git clone https://github.com/trixxyy-cloner/ByggCRM.git
cd ByggCRM
```

### 2. Installera Beroenden

```bash
npm install
```

Detta installerar alla paket som anges i `package.json`, inklusive:
- React och React DOM
- Tailwind CSS
- Vite
- TypeScript
- Lucide React ikoner

## 💻 Lokal utveckling

### Starta Utvecklingsserver

```bash
npm run dev
```

Detta startar:
- Vite dev server (vanligtvis på `http://localhost:5173`)
- Automatisk öppning av appen i webbläsaren
- Hot Module Replacement (HMR) för direkta uppdateringar

Appen uppdateras automatiskt när du gör ändringar i källkoden.

### Projektstruktur

```
src/
├── components/             # React-komponenter
│   ├── Header.tsx         # Header med sökning och notifikationer
│   ├── Sidebar.tsx        # Navigeringsmeny
│   ├── StatCard.tsx       # Statistikcards (med localStorage)
│   ├── ProjectCard.tsx    # Projektkort
│   ├── CustomerCard.tsx   # Kundkort
│   ├── DashboardView.tsx  # Dashboard-vy
│   ├── CustomersView.tsx  # Kund-vy
│   └── ProjectsView.tsx   # Projekt-vy
├── styles/                 # CSS-filer
│   ├── index.css          # Main entry point
│   ├── animations.css     # Animationer och transitions
│   ├── tailwind.css       # Tailwind CSS setup
│   └── theme.css          # Tema och CSS-variabler
├── types.ts               # TypeScript-interfaces
├── mockData.ts            # Exempeldata
├── App.tsx                # Huvudkomponent
└── main.tsx               # Ingångspunkt
```

## 🏗️ Byggning för produktion

### Skapa Production Build

```bash
npm run build
```

Detta kommando:
- Kör TypeScript-typkontroll (`tsc`)
- Bygger applikationen med Vite
- Matar ut optimerade filer till mappen `dist/`
- Minifierar och bundlar alla tillgångar

Den byggda applikationen är klar för distribution.

### Förhandsgranska Production Build

För att testa produktionsbygget lokalt:

```bash
npm run preview
```

Detta startar en lokal server som serverar produktionsbygget.

## 🌐 Live Applikation

### Produktions-URL

**https://byggcrm-app-wgu3p.ondigitalocean.app/**


## 📦 Beroenden

Viktiga beroenden (se `package.json` för fullständig lista):

- `react`: React UI-bibliotek
- `react-dom`: React DOM-rendering
- `typescript`: Typsäkerhet för JavaScript
- `vite`: Snabb build-verktyg
- `tailwindcss`: Utility-first CSS-ramverk
- `lucide-react`: Ikonbibliotek

## 🔒 Browser-lagring

Applikationen använder **localStorage** för att spara data:

- Användarstatistik och mätvärden
- Applikationstillstånd (där tillämpligt)

Data sparas lokalt i användarens webbläsare och skickas inte till någon server.

## 🛠️ Bygg- och Deploy-kommandon

| Kommando | Syfte |
|----------|-------|
| `npm install` | Installera beroenden |
| `npm run dev` | Starta utvecklingsserver |
| `npm run build` | Skapa produktionsversion |
| `npm run preview` | Förhandsgranska produktionsversion lokalt |

## 📋 Kravuppfyllelse

Se [krav.md](./krav.md) för en detaljerad lista över alla implementerade krav och funktioner.

## 🐛 Felsökning

### Port redan i användning

Om port 5173 redan är i bruk:

```bash
npm run dev -- --port 3000
```

### Rensa cache och installera om

```bash
rm -rf node_modules
npm install
npm run dev
```

### Byggfel

Se till att TypeScript-kompileringen lyckas:

```bash
npx tsc --noEmit
```