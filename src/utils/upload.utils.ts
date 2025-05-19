import { UploadWeatherData } from '../types/weather';

export const validateWeatherData = (data: any): UploadWeatherData[] => {
  if (!Array.isArray(data)) throw new Error('Invalid format, must be array');

  return data.map((entry, index) => {
    if (
      typeof entry.city !== 'string' ||
      typeof entry.lat !== 'string' ||
      typeof entry.lon !== 'string' ||
      typeof entry.temp !== 'string' ||
      typeof entry.humidity !== 'string'
    ) {
      throw new Error(`Invalid weather data format at index ${index}`);
    }

    return {
      city: entry.city,
      lat: entry.lat,
      lon: entry.lon,
      temp: entry.temp,
      humidity: entry.humidity,
    };
  });
};
