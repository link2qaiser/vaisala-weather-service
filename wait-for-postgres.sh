
#!/bin/sh
# wait-for-postgres.sh

# Default values if environment variables are not set
: "${POSTGRES_HOST:=postgres}"
: "${POSTGRES_PORT:=5432}"
: "${POSTGRES_USER:=weatheruser}"
: "${POSTGRES_PASSWORD:=weatherpass}"
: "${POSTGRES_DB:=weatherdb}"

# Log connection details
echo "Waiting for PostgreSQL to be ready at $POSTGRES_HOST:$POSTGRES_PORT..."
echo "Using database: $POSTGRES_DB, user: $POSTGRES_USER"

# Wait for PostgreSQL to be ready
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q'; do
  echo "Postgres is unavailable - sleeping for 1 second"
  sleep 1
done

# PostgreSQL is ready
echo "PostgreSQL is up and ready - executing migrations"

# Run migrations
echo "Running database migrations..."
node migrations/runner.js

echo "Database migrations completed"