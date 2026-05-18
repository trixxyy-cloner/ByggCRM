# ByggCRM - Construction CRM System

Ett CRM-system för att hantera byggprojekt och kunder. React frontend + ASP.NET Core backend.

**Frontend och backend är separata** - Se [Backend README](backend/ByggCRM.Api/README.md) för serversidig setup.

## Funktioner

- Instrumentpanel med projekt- och kundöversikt
- Projekt- och kundhantering
- JWT-autentisering
- Responsiv design

## Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS (Port: 5173)  
**Backend:** .NET 8, ASP.NET Core, SQL Server LocalDB (Port: 3001)

## Installation

### Frontend

```bash
npm install
npm run dev      # Starta dev server på http://localhost:5173
npm run build    # Build för produktion → dist/ folder
```

### Backend

Se [Backend README](backend/ByggCRM.Api/README.md)

## API Endpoints

**Base URL:** `http://localhost:3001/api`

### Auth
```
POST /auth/login       - Logga in
POST /auth/register    - Registrera
```

### Projects (kräver JWT token)
```
GET  /projects         - Hämta alla projekt
POST /projects         - Skapa projekt
PUT  /projects/{id}    - Uppdatera projekt
DELETE /projects/{id}  - Ta bort projekt
```

**POST /projects-exempel:**
```json
{
  "name": "Villa Renovering",
  "client": "Anders",
  "address": "Storgatan 1",
  "startDate": "2024-01-15",
  "endDate": "2024-06-30",
  "budget": 500000,
  "status": "ongoing",
  "progress": 50,
  "team": ["John", "Jane"]
}
```

### Customers (kräver JWT token)
```
GET  /customers        - Hämta alla kunder
POST /customers        - Skapa kund
PUT  /customers/{id}   - Uppdatera kund
DELETE /customers/{id} - Ta bort kund
```

**POST /customers-exempel:**
```json
{
  "name": "Anders Andersson",
  "company": "AA Konstruktion",
  "email": "anders@example.com",
  "phone": "+46-70123456",
  "address": "Storgatan 1",
  "totalSpent": 0
}
```

## Deployment

Frontend: `npm run build` → ladda upp `dist/` mappen till Digital Ocean  
Backend: Se [Backend README](backend/ByggCRM.Api/README.md) för deployment instruktioner

**Live:** https://byggcrm-app-wgu3p.ondigitalocean.app/
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

## 📡 API-dokumentation

### Autentisering

Alla skyddade endpoints kräver JWT Bearer token i Authorization-headern:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Tokens skapas vid login/register och sparas i localStorage.

### REST Endpoints

#### 🔐 Autentisering (`/api/auth/`)

| Metod | Endpoint | Beskrivning | Status |
|-------|----------|-------------|--------|
| POST | `/api/auth/login` | Logga in användare | ✅ Implementerad |
| POST | `/api/auth/register` | Registrera ny användare | ✅ Implementerad |

**Login Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Register Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "confirmPassword": "Password123",
  "fullName": "John Doe"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user-id-uuid",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

---

#### 📊 Projekt (`/api/projects/`) - Kräver JWT

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| GET | `/api/projects` | Hämta alla projekt |
| GET | `/api/projects/{id}` | Hämta specifikt projekt |
| POST | `/api/projects` | Skapa nytt projekt |
| PUT | `/api/projects/{id}` | Uppdatera projekt |
| DELETE | `/api/projects/{id}` | Ta bort projekt |

**GET `/api/projects` Response:**
```json
[
  {
    "id": "proj-123",
    "name": "Villa Renovering",
    "client": "Anders Andersson",
    "address": "Storgatan 1, Stockholm",
    "startDate": "2024-01-15",
    "endDate": "2024-06-30",
    "budget": 500000,
    "status": "ongoing",
    "progress": 65,
    "team": ["John", "Jane", "Bob"]
  }
]
```

**POST `/api/projects` Request:**
```json
{
  "name": "Nytt projekt",
  "client": "Klientnamn",
  "address": "Adress",
  "startDate": "2024-01-15",
  "endDate": "2024-06-30",
  "budget": 500000,
  "status": "planning",
  "progress": 0,
  "team": []
}
```

---

#### 👥 Kunder (`/api/customers/`) - Kräver JWT

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| GET | `/api/customers` | Hämta alla kunder |
| GET | `/api/customers/{id}` | Hämta specifik kund |
| POST | `/api/customers` | Skapa ny kund |
| PUT | `/api/customers/{id}` | Uppdatera kund |
| DELETE | `/api/customers/{id}` | Ta bort kund |

**GET `/api/customers` Response:**
```json
[
  {
    "id": "cust-456",
    "name": "Anders Andersson",
    "company": "AA Konstruktion AB",
    "email": "anders@example.com",
    "phone": "+46-701234567",
    "address": "Storgatan 1, Stockholm",
    "projects": 3,
    "totalSpent": 1500000,
    "joinDate": "2023-06-15"
  }
]
```

**POST `/api/customers` Request:**
```json
{
  "name": "Ny Kund",
  "company": "Företagsnamn",
  "email": "kund@example.com",
  "phone": "+46-701234567",
  "address": "Adress",
  "totalSpent": 0
}
```

---

### Frontend API Usage

Frontend använder custom HTTP-client från `src/services/api.ts`:

```typescript
import { post, get, put, delete } from '@/services/api';

// Exempel: Hämta projekt
const projects = await get<ProjectDto[]>('/projects', token);

// Exempel: Skapa kund
const customer = await post<CustomerDto>(
  '/customers',
  { name: "Ny Kund", ... },
  token
);

// Exempel: Uppdatera projekt
const updated = await put<ProjectDto>(
  `/projects/${id}`,
  { name: "Uppdaterat namn", ... },
  token
);

// Exempel: Ta bort kund
await delete(`/customers/${id}`, token);
```

**Backend-URL** är konfigurerad i [src/services/api.ts](src/services/api.ts) - justera `API_BASE_URL` för produktion.

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