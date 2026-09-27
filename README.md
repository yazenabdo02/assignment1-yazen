# status-backend

A small Express API (the backend of the Status Board), deployed to a **Windows IIS** site by a **self-hosted GitHub Actions runner**.

## Endpoints
- `GET /health` -> `{ "status": "ok" }`
- `GET /api/version` -> `{ "name", "version" }`
- `GET /api/services` -> `{ "services": [...], "summary": {...} }`

## Run locally
```bash
npm install
npm start          # http://localhost:3000
```

## Test
```bash
npm run test:unit
npm run test:api
npm run test:coverage
```

## Pipelines
- **CI** (`.github/workflows/ci.yml`) — on push/PR: unit tests, API tests, coverage.
- **CD** (`.github/workflows/cd.yml`) — manual (`workflow_dispatch`): runs on the **self-hosted Windows runner**, backs up the current site, deploys, health-checks, **rolls back on failure**, then tags a release.

## IIS
`web.config` uses **HttpPlatformHandler** to launch `node src/server.js` and forward requests. The backend IIS site is bound to port **8081** (see the setup guide).
