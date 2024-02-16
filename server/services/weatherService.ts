import axios from 'axios';

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface List {
  dt: number;
  main: Main;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {all: number};
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {'3h': number;};
  sys: {pod: string};
  dt_txt: string;
}

interface WeatherResponse {
  country: string;
  data: {
    city: any;
    cod: number;
    cnt: number;
    list: List[];
    message: number;
  };
  name: string;
  lat: number;
  lon: number;
  local_names: {
    [key: string]: string;
  };
}
const key = process.env.API_KEY;
const url = process.env.API_URL + '/weather' ?? '';
const baseParams = {
  lang: 'ja',
  appid: key,
  units: 'metric',
};

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
export const getWeatherAndCity = async (lat: string, lon: string): Promise<WeatherResponse> => {
  const city = await getCity(lat, lon);
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
    const response = {
      data,
      ...city
    };
    return response;
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
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error while fetching weather data');
  }
};
