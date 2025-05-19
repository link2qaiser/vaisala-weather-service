import express from 'express';
import weatherRoutes from './routes/weather.routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', weatherRoutes);

export default app;
