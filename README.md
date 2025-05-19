# Weather Service

A RESTful service for uploading and retrieving weather data with geospatial support.

## Features

- Upload weather data in JSON format
- Retrieve weather data based on location coordinates (latitude/longitude)
- Find the closest weather data point to a given location
- Convert temperature between Celsius and Fahrenheit
- PostgreSQL with PostGIS for efficient geospatial queries
- Docker deployment ready

## Tech Stack

- TypeScript
- Node.js (>= 21)
- Express.js
- PostgreSQL with PostGIS extension
- Docker & Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js >= 21 (for local development)

### Installation and Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/link2qaiser/vaisala-weather-service
   cd vaisala-weather-service
   ```

2. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```

3. Start the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

   This will:
   - Build the Docker image
   - Start the PostgreSQL database
   - Run the database migrations
   - Start the application on port 3000

### Environment Variables

The application uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Port number for the application | 3000 |
| NODE_ENV | Environment (development, production) | development |
| DB_HOST | Database host | postgres |
| DB_PORT | Database port | 5432 |
| DB_USER | Database username | postgres |
| DB_PASSWORD | Database password | postgres |
| DB_NAME | Database name | weather_db |
| MAX_UPLOAD_SIZE | Maximum file upload size | 10mb |
| DEFAULT_MAX_DISTANCE | Default maximum distance for weather data queries (meters) | 100000 |

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start a PostgreSQL instance (with PostGIS):
   ```bash
   docker-compose up -d postgres
   ```

3. Run the migrations:
   ```bash
   npm run migration:up
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Upload Weather Data

Upload weather data in JSON format.

- **URL**: `/api/weather/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Parameter**: `file` (JSON file)

**Example Request**:
```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "file=@weather_data.json" http://localhost:3000/api/weather/upload
```

**Example JSON Format**:
```json
{
  "data": [
    {
      "locationName": "New York City",
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "temperature": 22.5,
      "humidity": 65,
      "windSpeed": 10.2,
      "precipitation": 0,
      "recordedAt": "2023-01-01T12:00:00Z"
    }
  ]
}
```

**Example Success Response**:
```json
{
  "success": true,
  "message": "Successfully processed 1 weather data points",
  "count": 1
}
```

### Get Weather Data by Location

Retrieve weather data by location coordinates.

- **URL**: `/api/weather`
- **Method**: `GET`
- **Query Parameters**:
  - `lat` (required): Latitude (-90 to 90)
  - `lon` (required): Longitude (-180 to 180)
  - `unit` (optional): Temperature unit ('C' or 'F', default: 'C')
  - `maxDistance` (optional): Maximum distance in meters (default: 100000)

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/weather?lat=40.7128&lon=-74.0060&unit=F"
```

**Example Success Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "locationName": "New York City",
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "temperature": 72.5,
    "humidity": 65,
    "windSpeed": 10.2,
    "precipitation": 0,
    "recordedAt": "2023-01-01T12:00:00Z",
    "createdAt": "2023-01-01T12:05:00Z",
    "distance": 0
  },
  "unit": "F"
}
```

## Database Schema

The main table `weather_data` has the following structure:

- `id`: Serial primary key
- `location_name`: Name of the location (varchar)
- `location`: Geographic point (PostGIS geography type)
- `temperature`: Temperature in Celsius (decimal)
- `humidity`: Humidity in percentage (decimal, optional)
- `wind_speed`: Wind speed in m/s (decimal, optional)
- `precipitation`: Precipitation in mm (decimal, optional)
- `recorded_at`: Time when the weather data was recorded (timestamp with timezone)
- `created_at`: Time when the record was created (timestamp with timezone)