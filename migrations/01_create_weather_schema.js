const { Client } = require('pg');
require('dotenv').config();

async function runMigrations() {
  console.log('Starting database migrations...');
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432')
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    await client.query(`
      -- Enable geo extensions
      CREATE EXTENSION IF NOT EXISTS cube;
      CREATE EXTENSION IF NOT EXISTS earthdistance;

      -- Drop old function and table if they exist
      DROP FUNCTION IF EXISTS find_closest_location(FLOAT, FLOAT);
      DROP TABLE IF EXISTS weather;

      -- Create the weather table
      CREATE TABLE weather (
        id SERIAL PRIMARY KEY,
        city VARCHAR(255) NOT NULL,
        lat FLOAT NOT NULL,
        lon FLOAT NOT NULL,
        temp FLOAT NOT NULL,
        humidity FLOAT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create function to find the closest location by coordinates
      CREATE FUNCTION find_closest_location(input_lat FLOAT, input_lon FLOAT)
      RETURNS TABLE (
        id INT,
        city VARCHAR(255),
        lat FLOAT,
        lon FLOAT,
        temp FLOAT,
        humidity FLOAT,
        distance FLOAT
      ) AS $$
      BEGIN
        RETURN QUERY
          SELECT 
            w.id,
            w.city,
            w.lat,
            w.lon,
            w.temp,
            w.humidity,
            earth_distance(
              ll_to_earth(w.lat, w.lon),
              ll_to_earth(input_lat, input_lon)
            ) AS distance
          FROM weather w
          ORDER BY distance ASC
          LIMIT 1;
      END;
      $$ LANGUAGE plpgsql;
    `);

    console.log('✅ Migration completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

runMigrations().catch(error => {
  console.error('Migration process failed:', error);
  process.exit(1);
});
