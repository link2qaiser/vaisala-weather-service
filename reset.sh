#!/bin/bash
# Reset Docker environment and start fresh

docker compose down --volumes --remove-orphans
docker volume rm vaisala-weather-service_pgdata
docker compose build --no-cache
docker compose up