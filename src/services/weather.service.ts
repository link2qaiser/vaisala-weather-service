import { pool } from '../config/database';
import { UploadWeatherData } from '../types/weather';

export const insertWeatherData = async (data: UploadWeatherData[]) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const entry of data) {
      await client.query(
        `INSERT INTO weather (city, lat, lon, temp, humidity)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          entry.city,
          parseFloat(entry.lat),
          parseFloat(entry.lon),
          parseFloat(entry.temp),
          parseFloat(entry.humidity)
        ]
      );
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

export const findClosestWeather = async (
  lat: number,
  lon: number,
  unit: 'c' | 'f'
) => {
  const result = await pool.query(
    `SELECT *,
      (point($1, $2) <@> point(lat, lon)) * 1.60934 AS distance_km,
      CASE WHEN $3 = 'f' THEN (temp * 9 / 5) + 32 ELSE temp END AS temperature_converted
     FROM weather
     ORDER BY distance_km ASC
     LIMIT 1`,
    [lat, lon, unit]
  );
  return result.rows[0];
};
