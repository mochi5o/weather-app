import express from 'express';
import axios from 'axios';
import pool from './db'; // データベース接続を管理するファイルからpoolをインポート

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
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const response = await axios.get(url, {
      params: {
        lat: 35.6895,
        lon: 139.6917,
        exclude: 'minutely,hourly',
        unit: 'metric',
        lang: 'jp',
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
