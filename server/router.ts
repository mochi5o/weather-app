import express from 'express';
import axios from 'axios';
import pool from './db';
import { getWeather } from './controllers/weatherController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/health', (req, res) => {
  res.status(200).send('OK');
});

router.get('/data', async (req, res) => {
  console.log('Fetching data');
  try {
    pool.getConnection()
      .then(connection => {
        console.log('DB connection successful');
        connection.release();
      })
      .catch(err => {
        console.error('DB connection failed: ', err);
      });
    const [rows] = await pool.query('SELECT * FROM test_table');
    console.log(rows);
    res.json(rows);
  } catch (err) {
    res.status(500).send('Error while fetching data');
  }
});

router.get('/apicheck', async (req, res) => {
  // 外部APIとの疎通を確認するためのエンドポイント
  try {
    const key = process.env.API_KEY;
    const url = process.env.API_URL ?? '';
    const response = await axios.get(url, {
      params: {
        lat: 35.6895,
        lon: 139.6917,
        exclude: 'minutely,hourly',
        unit: 'metric',
        lang: 'ja',
        appid: key,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in API call');
  }
});

router.get('/weather', getWeather);
router.get('/weather-by-city', async (req, res) => {
  try {
    const city = req.query.city;
    if (typeof city !== 'string') {
      res.status(400).send('Invalid query parameters');
      return;
    }
    const key = process.env.API_KEY;
    const url = process.env.API_URL + '/weather' ?? '';
    const response = await axios.get(url, {
      params: {
        q: city,
        exclude: 'minutely,hourly',
        unit: 'metric',
        lang: 'ja',
        appid: key,
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in API call');
  }
});
export default router;
