import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import { insertWeatherData, findClosestWeather } from '../services/weather.service';
import { validateWeatherData } from '../utils/upload.utils';
import { handleError } from '../utils/error.utils';

const upload = multer({ dest: 'uploads/' });

export const uploadWeather = [
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const content = fs.readFileSync(req.file.path, 'utf8');
      const jsonData = JSON.parse(content);
      const validatedData = validateWeatherData(jsonData);
      await insertWeatherData(validatedData);

      res.status(200).json({ message: 'Weather data uploaded successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
];

export const getWeatherByCoordinates = async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lon = parseFloat(req.query.lon as string);
    const unit = ((req.query.unit as string)?.toLowerCase() as 'c' | 'f') || 'c';

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

    const result = await findClosestWeather(lat, lon, unit);
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
};
