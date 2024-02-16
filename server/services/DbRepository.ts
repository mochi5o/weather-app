import { Pool, RowDataPacket } from 'mysql2/promise';
import pool from '../db';
import { WeatherResponse } from '../interfaces/WeatherTypes';

export class DbRepository {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async saveWeatherData(data: WeatherResponse) {
    console.log('save start');
    try {
      const connection = await this.pool.getConnection();
      const query = 'INSERT INTO weathers (name, timestamp, icon, description, temperature, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [
        data.name,
        data.dt,
        data.weather[0].icon,
        data.weather[0].description,
        data.main.temp,
        data.coord.lat,
        data.coord.lon
      ];
      await connection.query(query, values);
      console.log('Data saved');
      connection.release();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async checkIfDataExists(lat: string, lon: string) {
    // DBに同一の緯度経度が存在するか確認
    // lat, lonが同じデータが24時間以内に存在する場合はデータを返す、それ以外はnullを返す
    console.log('Check if data exists');
    try {
      const connection = await this.pool.getConnection();
      const query = 'SELECT * FROM weathers WHERE latitude = ? AND longitude = ? AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)';
      const [rows] = await connection.query(query, [lat, lon]) as unknown as [RowDataPacket[]];
      connection.release();

      if (rows.length > 0) {
        console.log('Data exists');
        console.log('Rows:', rows);
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
}
