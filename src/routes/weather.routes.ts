// src/routes/weather.routes.ts
import { Router } from 'express';

import { uploadWeather, getWeatherByCoordinates } from '../controllers/weather.controller';

const router = Router();

router.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

router.post('/weather/upload', uploadWeather);
router.get('/weather', getWeatherByCoordinates);

export default router;
