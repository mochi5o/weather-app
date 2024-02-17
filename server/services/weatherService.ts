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
    }
    return cityParams.data[0];
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error while fetching city data');
  }
};

const createWeatherData = (data: any) => {
  return {
    main: {
      temp: data.temperature,
    },
    coord: {
      lat: data.latitude,
      lon: data.longitude,
    },
    weather: [
      {
        description: data.description,
        icon: data.icon,
      }
    ],
    name: data.name,
    cod: 200,
    dt: data.timestamp,
    message: 'Data exists in DB',
  };
};

const notFoundResponse = (city: string) => {
  return {
    main: {
      temp: 0,
    },
    coord: {
      lat: 0,
      lon: 0,
    },
    weather: [
      {
        description: '',
        icon: '',
      }
    ],
    name: city,
    cod: 404,
    dt: 0,
    message: 'データが検索できませんでした。別の地名を検索してください。',
  };
};

export const getWeatherAndCity = async (lat: string, lon: string): Promise<WeatherResponse> => {
  const city = await getCity(lat, lon);
  // DBに同一の緯度経度が存在するか確認
  const recentData = await dbRepository.checkIfDataExistsLatLog(city.lat, city.lon);
  if (recentData) {
    // 24時間以内に同一の緯度経度で取得したデータが存在する場合はDBからデータを返す
    return createWeatherData(recentData);
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

    await dbRepository.saveWeatherData(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error while fetching weather data');
  }
};

export const getWeatherByCityName = async (city: string): Promise<WeatherResponse> => {
  // DBに同一の緯度経度が存在するか確認
  const recentData = await dbRepository.checkIfDataExistsCityName(city);
  if (recentData) {
    // 24時間以内に同一の緯度経度で取得したデータが存在する場合はDBからデータを返す
    return createWeatherData(recentData);
  }
  try {
    const response = await axios.get(url, {
      params: {
        q: city,
        ...baseParams,
      }
    });
    if (!response || response.status !== 200) {
      // 地名の検索に失敗する時がある
      return notFoundResponse(city);
    }
    const data = response.data;
    data.name = city;
    await dbRepository.saveWeatherData(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error while fetching weather data');
  }
};
