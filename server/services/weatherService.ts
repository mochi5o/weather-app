import { DbRepository } from './DbRepository';
import { WeatherResponse } from '../interfaces/WeatherTypes';
import axios from 'axios';

const key = process.env.API_KEY;
const url = process.env.API_URL + '/weather' ?? '';
const baseParams = {
  lang: 'ja',
  appid: key,
  units: 'metric',
};
const dbRepository = new DbRepository();

const getCity = async (lat: string, lon: string) => {
  // 代表地点の緯度経度を取得
  try {
    const cityUrl = 'http://api.openweathermap.org/geo/1.0/reverse'
    const cityParams = await axios.get(cityUrl, {
      params: {
        lat: lat,
        lon: lon,
        limit: 1,
        appid: key,
      }
    });

    if (!cityParams.data || cityParams.data.length === 0) {
      throw new Error('No city data returned from API');
      // TODO:フロントに適切なエラーメッセージを返す
      // return {
      //   code: 204,
      //   status: 'NoData',
      //   message: 'No city data returned from API'
      // };
    }
    return cityParams.data[0];
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error while fetching city data');
  }
};

export const getWeatherAndCity = async (lat: string, lon: string): Promise<WeatherResponse> => {
  const city = await getCity(lat, lon);

  // DBに同一の緯度経度が存在するか確認
  const recentData = await dbRepository.checkIfDataExists(city.lat, city.lon);
  if (recentData) {
    // 24時間以内に同一の緯度経度で取得したデータが存在する場合はDBからデータを返す
    const data = {
      main: {
        temp: recentData.temperature,
      },
      coord: {
        lat: recentData.latitude,
        lon: recentData.longitude,
      },
      weather: [
        {
          description: recentData.description,
          icon: recentData.icon,
        }
      ],
      name: recentData.name,
      cod: 200,
      dt: recentData.timestamp,
    }
    console.log('Data exists in DB');
    return data;
  };

  // 代表地点の緯度経度で天気情報を取得
  try {
    const weatherParams = await axios.get(url, {
      params: {
        lat: lat,
        lon: lon,
        ...baseParams,
      }
    });
    const data = weatherParams.data;
    data.name = city.local_names.ja;
    data.coord.lat = city.lat;
    data.coord.lon = city.lon;
    console.log(data);

    // DBに代表地点の緯度経度と天気情報を保存
    await dbRepository.saveWeatherData(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error while fetching weather data');
  }
};

export const getWeatherByCityName = async (city: string): Promise<WeatherResponse> => {
  try {
    const response = await axios.get(url, {
      params: {
        q: city,
        ...baseParams,
      }
    });
    // console.log(response.data);
    const data = response.data;
    // DBに代表地点の緯度経度と天気情報を保存
    await dbRepository.saveWeatherData(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error while fetching weather data');
  }
};
