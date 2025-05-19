# Vaisala Weather Service

A simple RESTful API to upload and retrieve weather data using PostgreSQL with geospatial support.

## 🚀 Features

- Upload weather data via JSON file
- Retrieve the closest weather entry based on lat/lon coordinates
- Convert temperature from Celsius to Fahrenheit (optional)
- PostgreSQL extensions (`cube`, `earthdistance`) for location distance queries
- Docker-based deployment

## 🛠 Tech Stack

- TypeScript
- Node.js (≥ 21)
- Express.js
- PostgreSQL (with `cube` and `earthdistance`)
- Docker & Docker Compose

---

## 📦 Getting Started

### 🔧 Prerequisites

- Docker + Docker Compose
- Node.js ≥ 21 (for local development)

### 📥 Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/link2qaiser/vaisala-weather-service
cd vaisala-weather-service
```

2. Create a `.env` file:

```bash
cp .env.example .env
```

3. Start the services with Docker:

```bash
docker compose up -d
```

This will:
- Build the app image
- Start PostgreSQL
- Run database migrations
- Launch the API on port `3000`

4. Run Migration to create schema

```bash
docker compose exec app npm run db:migrate
```

## 🔧 Local Development

1. Install Node.js dependencies:

```bash
npm install
```

2. Start only the database if needed:

```bash
docker compose up -d postgres
```

3. Run the migration script:

```bash
docker compose exec app npm run db:migrate
```

---

## 📡 API Endpoints

### ✅ Health Check

- **GET** `/health`

---

### 🌤️ Upload Weather Data

- **POST** `/weather/upload`
- **Content-Type**: `multipart/form-data`
- **Form field**: `file` (JSON)

**Example curl**:

```bash
curl -X POST http://localhost:3000/api/weather/upload \
  -F "file=@weather-sample.json"
```

**JSON Format**:

```json
[
  {
    "city": "Helsinki",
    "lat": "60.1676",
    "lon": "24.9421",
    "temp": "7.0",
    "humidity": "40.5"
  }
]
```

---

### 🌍 Get Closest Weather by Coordinates

- **GET** `/weather`
- **Query Parameters**:
  - `lat` (required): Latitude
  - `lon` (required): Longitude
  - `unit` (optional): `c` or `f` (Celsius or Fahrenheit, default: `c`)

**Example**:

```bash
curl "http://localhost:3000/api/weather?lat=60.1676&lon=24.9421&unit=f"
```

---

## 🗃️ Database Schema

The `weather` table contains:

| Column     | Type                  | Description               |
|------------|-----------------------|---------------------------|
| id         | SERIAL PRIMARY KEY    | Unique record ID          |
| city       | VARCHAR(255)          | City name                 |
| lat        | FLOAT                 | Latitude                  |
| lon        | FLOAT                 | Longitude                 |
| temp       | FLOAT                 | Temperature (°C)          |
| humidity   | FLOAT                 | Humidity (%)              |
| created_at | TIMESTAMPTZ           | Record creation time      |

---


## Sample Data File

There is file regarding sample data `sample-data.json`

---


## Postman Collection

There is file regarding Postman collection to validate the endpoints `Weather Service API.postman_collection.json`


## Setup Video
Watch this short tutorial to see how to setup, configure, and run the Vaisala Weather Service:
>[▶️ Vaisala Weather Service Setup Video](https://www.youtube.com/watch?v=HyM3g_7frU8)









