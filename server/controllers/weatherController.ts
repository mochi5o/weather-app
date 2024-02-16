import { Request, Response } from 'express';
import { getWeatherAndCity } from '../services/WeatherService';

export const getWeather = async (req: Request, res: Response) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;

    if (typeof lat !== 'string' || typeof lon !== 'string') {
      res.status(400).send('Invalid query parameters');
      return;
    }

    const response = await getWeatherAndCity(lat, lon);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in API call');
  }
};
