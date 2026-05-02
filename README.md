# Sonic Immersive

Sonic Immersive is a premium, full-stack music streaming platform designed with a modern glassmorphism aesthetic, responsive fluid layouts, and a robust .NET 8 backend.

![Platform Screenshot](https://via.placeholder.com/1200x600?text=Sonic+Immersive+-+Premium+Music+Streaming)

## 🏗 Architecture

The project is divided into two main architectural components:

### 1. Frontend (`musicapp-client`)
- **Framework**: Next.js 15 (App Router) + React 19
- **State Management**: Zustand (Global Player Store)
- **Styling**: Tailwind CSS (Custom glassmorphism utilities & CSS variables)
- **Testing**: Jest (Unit & Component Tests) + Playwright (End-to-End Tests)

### 2. Backend (`MusicApp.Api`)
- **Framework**: .NET 8 ASP.NET Core Web API
- **Database**: PostgreSQL with Entity Framework Core
- **Patterns**: Dependency Injection, Repository/Service Pattern, Global Exception Middleware
- **Features**: RESTful design, Data Seeding, OpenAPI (Swagger) integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- .NET 8 SDK
- PostgreSQL (running locally or via Docker)

### Backend Setup
1. Navigate to the API folder:
   ```bash
   cd MusicApp.Api
   ```
2. Configure your database connection string in `appsettings.Development.json` (Defaults to localhost).
3. Apply Entity Framework Migrations (if applicable) and run the server:
   ```bash
   dotnet run
   ```
   *The server will start on `http://localhost:5089` and automatically seed initial music data.*

### Frontend Setup
1. Navigate to the client folder:
   ```bash
   cd musicapp-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:3000`.*

## 🧪 Testing

The codebase maintains strict quality standards through automated testing.

### Unit & Component Testing
Run Jest tests to verify isolated React components and utility logic:
```bash
cd musicapp-client
npm test
```

### End-to-End (E2E) Testing
Run Playwright tests to simulate real user interactions across the full stack:
```bash
cd musicapp-client
npx playwright test
```
To view the generated HTML report if a test fails:
```bash
npx playwright show-report
```

## 🛡 Enterprise Standards Implementation

- **Global Error Handling**: The backend utilizes a centralized `GlobalExceptionMiddleware` mapping all unhandled exceptions to standardized `RFC 7807` Problem Details JSON.
- **Resilient API Client**: The frontend `apiClient.ts` uses an `AbortController`-based timeout mechanism to gracefully degrade if the backend becomes unresponsive.
- **Strict Typing**: Full end-to-end type safety between C# DTOs and TypeScript interfaces.

## 📄 License

This project is licensed under the MIT License.
