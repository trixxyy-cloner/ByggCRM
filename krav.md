# Kravuppfyllelse - ByggCRM v2.0

## KÄLLKODSHANTERING (1-6)

### Krav 1: Git-Versionshantering (5p) ✅
Git-repo från föregående projekt med commits och versionering (v1.0 → v2.0).

### Krav 2: README.md (7p) ✅
README.md innehåller installationsinstruktioner, build-kommando och projektöversikt.

### Krav 3: Deploy (10p) 🔄
Deploy till Digital Ocean - pågår.

### Krav 4: Byggsystem (5p) ✅
Vite byggsystem. Kör `npm run build` för att bygga.

### Krav 5: .gitignore (5p) ✅
.gitignore innehåller: node_modules/, dist/, .env, .DS_Store

### Krav 6: krav.md (10p) ✅
Detta dokument.

---

## APP-KRAV (7-16)

### Krav 7: React Rendering (5p) ✅
Appen renderas med React i webbläsaren.

### Krav 8: 5+ Komponenter (15p) ✅
8 komponenter skapade:
- Header.tsx
- Sidebar.tsx
- StatCard.tsx
- ProjectCard.tsx
- CustomerCard.tsx
- DashboardView.tsx
- CustomersView.tsx
- ProjectsView.tsx

### Krav 9: JSX Syntax (5p) ✅
Alla komponenter är .tsx-filer med JSX.

### Krav 10: Event Handling (5p) ✅
Header, Sidebar, ProjectCard och CustomerCard har onClick/onChange events.

### Krav 11: State & Conditional Rendering (5p) ✅
Header (searchQuery, showNotifications), ProjectCard (isExpanded), CustomerCard (showContact).

### Krav 12: useEffect Lifecycle Hook (10p) ✅
App.tsx använder useEffect för localStorage - läser vid start, sparar när stats ändras.

### Krav 13: LocalStorage Sparning (10p) ✅
StatCard sparar värden i localStorage. Klicka "Increase"-knapp för att testa.

### Krav 14: LocalStorage Vid Rendering (10p) ✅
App läser localStorage vid start och uppdaterar stats automatiskt.

### Krav 15: CSS Styling (5p) ✅
Tailwind CSS för styling av alla komponenter.

### Krav 16: CSS Animations (5p) ✅
fadeIn, slideInLeft, hover-lift och transitions i animations.css.

---

## POÄNGSUMMERING

**App-krav**: 75/75p ✅
**Source Code**: 37/42p (väntar på deploy)

**TOTALT**: 112/117p

---

**Skapad**: 10 april 2026