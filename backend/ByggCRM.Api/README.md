# ByggCRM Backend - ASP.NET Core API

REST API för ByggCRM. Byggd med .NET 8, Entity Framework Core och SQL Server.

Se [Frontend README](../../README.md) för fullständigt projekt.

## Komma igång

**Förutsättningar:**
- .NET 8 SDK
- SQL Server LocalDB  
- Visual Studio

**Starta:**

Visual Studio: Öppna `ByggCRM.Api.sln` → F5

Via kommandorad:
```bash
cd backend/ByggCRM.Api
dotnet run
```

Server körs på `http://localhost:3001` och `https://localhost:3443`

## Konfiguration

**Database** (`appsettings.json`):
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ByggCRM;Trusted_Connection=true;"
}
```

Database skapas automatiskt vid startup.

**JWT** (`appsettings.json`):
```json
"Jwt": {
  "SecretKey": "your-secret-key-at-least-32-chars",
  "Issuer": "ByggCRM.Api",
  "Audience": "ByggCRM.Client",
  "ExpirationMinutes": 60
}
```

**CORS** (`Program.cs`):
```csharp
var frontendUrl = "http://localhost:5173";  // dev
// eller "https://byggcrm-app-wgu3p.ondigitalocean.app";  // prod
```

## API Endpoints

Base: `http://localhost:3001/api`

### Auth
```
POST /auth/login         (ingen token behövs)
POST /auth/register      (ingen token behövs)
```

### Projects (kräver JWT)
```
GET    /projects
GET    /projects/{id}
POST   /projects         ✅ Implementerad
PUT    /projects/{id}
DELETE /projects/{id}
```

POST exempel:
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
  "team": ["John"]
}
```

### Customers (kräver JWT)
```
GET    /customers
GET    /customers/{id}
POST   /customers        ✅ Implementerad
PUT    /customers/{id}
DELETE /customers/{id}
```

POST exempel:
```json
{
  "name": "Anders",
  "company": "AA Konstruktion",
  "email": "anders@example.com",
  "phone": "+46-70123456",
  "address": "Storgatan 1",
  "totalSpent": 0
}
```

## Swagger

Testa endpoints här när server körs:

https://localhost:3443/swagger/index.html

Logga in först för att få JWT token, sen click "Authorize" och paste: `Bearer {token}`

## Production

**Digital Ocean:**

1. Create App → Git repo → `backend/ByggCRM.Api`
2. Build & run commands: auto-detected
3. Frontend uppdateras med backend-URL

**Secrets:** Använd environment variables, inte hardkodade värden i appsettings.json

## Troubleshooting

**Databaskopplingen misslyckas:**
```bash
sqllocaldb start mssqllocaldb
```

**401 Unauthorized:**
- Logga in igen för ny token (gäller 60 minuter)

**CORS-fel:**
- Uppdatera frontendUrl i Program.cs

## Användbara kommandon

```bash
dotnet build              # Bygg projekt
dotnet run               # Starta server
dotnet test              # Kör tester
dotnet publish -c Release # Publicera för produktion

# Database migrations
dotnet ef migrations list                  # Visa alla migrations
dotnet ef migrations add MigrationName    # Skapa ny migration
dotnet ef database update                 # Uppdatera databas
```

## Länk till frontend

[Frontend README](../../README.md)
