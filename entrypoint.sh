#!/bin/sh
# entrypoint.sh - Custom entrypoint script for the Weather Service application

echo "Starting entrypoint script"

# Verify build output
if [ ! -f "/app/dist/server.js" ]; then
  echo "ERROR: dist/server.js not found. Running build again..."
  npm run build
  
  if [ ! -f "/app/dist/server.js" ]; then
    echo "FATAL: Build failed. dist/server.js still not found."
    echo "Contents of /app directory:"
    ls -la /app
    echo "Contents of /app/src directory:"
    ls -la /app/src
    echo "Contents of package.json:"
    cat /app/package.json
    exit 1
  fi
fi

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB -c '\q'; do
  echo "PostgreSQL is unavailable - sleeping for 1 second"
  sleep 1
done

echo "PostgreSQL is up and ready!"

# Run migrations
echo "Running database migrations..."
node migrations/runner.js

# Start the application
echo "Starting the application..."
exec node dist/server.js