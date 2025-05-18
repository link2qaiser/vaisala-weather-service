# Vaisala Weather Data Service

A TypeScript/Node.js backend service providing weather data based on locations.

## Project Structure

```
weather-service/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   └── weatherController.ts
│   ├── models/
│   │   └── weatherModel.ts 
│   ├── routes/
│   │   └── weatherRoutes.ts
│   ├── services/
│   │   └── weatherService.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── distanceCalculator.ts
│   │   └── validators.ts
│   ├── app.ts
│   └── server.ts
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose