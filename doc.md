# ByggCRM - Dokumentation

**Källkod:** https://github.com/trixxyy-cloner/ByggCRM


---


## Krav 9: Data och statehantering

Jag använde **React Context API** för att spara login-info globalt. Det betyder att alla komponenter kan se om användaren är inloggad utan att jag behöver skicka info fram och tillbaka hela tiden.

När någon loggar in sparar jag token och användarinfo i localStorage. Det gör så att om de refreshar sidan förblir de inloggade. Nästa gång appen startar kollar jag på localStorage och om det finns något där loggas de in automatiskt.

Context API är enkel att använda och räcker för vad jag behövde. Det är redan inbyggt i React så jag behövde inte installera något extra.

---

## Krav 10: Min återanvändningsbar komponent

Jag gjorde **Modal** komponenten återanvändbar. En Modal är bara en popup-box. Istället för att skriva popup-kod flera gånger gör jag en Modal som kan användas till vad som helst.

Modal tar emot vad som ska synas inuti den (`children`). Så jag kan stoppa in en form, en bekräftelse, eller bara text. Jag använder samma Modal för att lägga till projekt, ta bort projekt, lägga till kunder, osv. Det sparar massa kodupprepning.

---

## Krav 11: Kodstruktur och felhantering

Jag gjorde en fil `api.ts` som hanterar all kommunikation med backend. Istället för att fetch-anrop är överallt i komponenterna går allt genom api.ts. Det gör det enklare att fixa grejer på ett ställe.

I api.ts har jag funktioner för get, post, put, delete. De skickar automatiskt med token när det behövs. Om något blir fel visar jag felmeddelanden.

Innan hade jag bugg med delete - servern skickade en tom response men jag försökte parsa det som JSON. Nu kollar jag vad servern faktiskt skickar först. Jag hanterar också när något inte finns på servern - då tar jag bara bort det från appen istället för att de ska krascha.

---

## Krav 12: Min Error Boundary

Error Boundary är en komponent som fångar fel när andra komponenter kraschar. Utan den kraschar hela appen. Med Error Boundary visar jag en sida som säger "något gick fel" istället.

Det visar vad felet var och en knapp för att reloada. Om användaren vill kan de expandera en detaljer-sektion för att se vad som gick tekniskt fel. Utan Error Boundary skulle sidan bara visa något kryptiskt felmeddelande och användaren skulle inte veta vad som hänt.

---

## Refaktorering och kodkvalitet

Efter att ha byggt ProjectsView och CustomersView märkte jag att båda komponenterna hade nästan identisk kod - samma form-logik, samma buttons, samma empty-state UI. Istället för att låta koden bli duplicerad refaktorerade jag och skapade två nya återanvändningsbara komponenter: EmptyState och FormButtonGroup. Det eliminerade en hel del rader duplicerad kod och gjorde komponenterna mycket renare.

Senare gjorde jag en större refaktorering i App.tsx. Där hade jag sex stycken CRUD-funktioner (handleCreateProject, handleUpdateProject, handleDeleteProject, handleCreateCustomer, handleUpdateCustomer, handleDeleteCustomer) som alla hade nästan identisk logik - samma error handling, samma notification-setup, bara olika serviceanrop. Jag refaktorerade detta och ersatte dem med tre generiska funktioner: createEntity, updateEntity och deleteEntity. Det eliminerade en hel del rader duplicerad kod och gör det mycket lättare att underhålla koden framöver.

Genom denna refaktorering blev koden mycket renare och lättare att bygga vidare på. Om jag senare vill lägga till nya entiteter (typ Products eller Teams) behöver jag bara skapa nya wrappers som använder samma generiska funktioner.

**Slutnoter:**
- 16 React komponenter
- Alla CRUD-operationer fungerar
- JWT autentisering med backend
- Notifications när man gör något
- Tailwind CSS för styling

