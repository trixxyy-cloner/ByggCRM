# ByggCRM - Rapport

## Vilken är din valda metod och teknik för källkodshantering?

### Teknik: Git och GitHub

Jag har valt **Git** som versionskontrollsystem kombinerat med **GitHub** som fjärrkodlager. 

**Git** är ett distribuerat versionskontrollsystem som låter mig spåra ändringar i källkoden över tid. GitHub är en molnbaserad plattform där jag lagrar mitt repository och kan dela kod med andra.

### Motivering av teknik

- **Git**: Är industristandarden för versionskontroll. Det gör det möjligt att se historiken av alla ändringar, skapa branches för experimentering, och rollback ändringar om något går fel.
- **GitHub**: Erbjuder ett centralt arkiv för mitt projekt och möjliggör tillsammans framtida samarbete med andra utvecklare. Det är också viktigt för att visa mitt arbete för potentiella arbetsgivare.

### Arbetsmetod

Under detta projekt har jag använt en enkel arbetsprocess:

1. **Initial setup**: Jag tog fram projektstrukturen med Vite, React och Tailwind CSS
2. **Utveckling i ett svep**: Eftersom projektet är relativt litet implementerade jag alla komponenter och funktionalitet i ett arbetspass
3. **En initial commit**: Jag gjorde en commit när projekten var i ett funktionellt tillstånd
4. **Planerad commit för rapport**: Jag planerar att göra en ny commit när denna rapport är klar

### Motivering av metod

För ett så småskaligt projekt som detta är en enkel arbetsprocess lämplig. Jag använde inte flera branches eller många commits eftersom:
- Projektet var överskådligt och kunde genomförås i ett arbetspass
- Det var bara en utvecklare (mig själv) som arbetade på projektet
- De olika delarna av koden var tightlykopplade och testades tillsammans

**För framtida större projekt** planerar jag att överväga en mer strukturerad process med:
- Feature branches för nya funktionaliteter
- Fler commits med beskrivande meddelanden
- Pull requests för kodgranskning

---

## Hur påverkar användningen av Javascript ramverk kodens struktur?

### Komponentbaserad arkitektur

React är ett komponentbaserat JavaScript-ramverk, vilket har påverkat min kodstruktur på ett fundamentalt sätt.

Istället för att ha en monolitisk fil med all logik, delade jag upp applikationen i tre separata React-komponenter:

```
src/components/
├── BusinessPlan.tsx     # Visar affärsplanen
├── ProjectIdea.tsx      # Visar projektidén
└── Contact.tsx          # Visar kontaktinfo
```

Varje komponent är isolerad och fokuserar på ett specifikt ansvarsområde. Detta följer den so-kallade "Single Responsibility Principle" som gör koden mer läsbar och testbar.

### Dataflöde och state management

React tvingar en strukturerad dataflödesarkitektur:

```tsx
// App.tsx - håller state för vilken vy som är aktiv
const [activeView, setActiveView] = useState('business')

// Beroende på state renderas rätt komponent
{activeView === 'business' && <BusinessPlan />}
```

Detta tvingar mig att tänka på:
- **Var state lagras** (i App-komponenten)
- **Hur data flödar** (från parent till children via props)
- **Hur ändringar hanteras** (via click-handlers som uppdaterar state)

### JSX-syntax

React använder JSX, som är en blandning av JavaScript och HTML. Detta gör UI-koden mycket lättare att läsa och förstå jämfört med att manipulera DOM direkt.

```tsx
// React/JSX - Lätt att läsa
<button onClick={() => setActiveView('business')}>Affärsplan</button>

// Vs alternativ utan ramverk - Mer komplicerat
const button = document.createElement('button');
button.textContent = 'Affärsplan';
button.addEventListener('click', () => setActiveView('business'));
```

### Fördelar av ramverket på kodstrukturen

1. **Modulär och återanvändbar**: Komponenter kan enkelt återanvändas på olika ställen
2. **Lätt att utöka**: Att lägga till nya sidor kräver bara en ny komponent
3. **Konsistent struktur**: Ramverket tvingar en standardiserad kod-struktur som underlättar underhållning
4. **Verktyg och ekosystem**: React har ett rikt ekosystem av bibliotek och verktyg

### Nackdelar som märktes i detta projekt

1. **Setup-komplexitet**: Det krävdes mycket konfiguration (Vite, Tailwind, TypeScript) innan jag kunde börja utveckla
2. **Overhead för små projekt**: För denna lilla applikation kunde en enkel HTML/JS-fil ha räckt, men React introducerie abstraktion
3. **Beroenden**: Projektet är nu beroende av React och dess ekosystem

### Slutsats

JavaScript-ramverk som React påverkar kodstrukturen genom att tvinga en komponentbaserad arkitektur. Detta gör koden mer organiserad, modulär och skalbar - även om det introducerar viss komplexitet för mycket små projekt. För en växande applikation är dessa strukturella fördelar väl värda kostnaderna.