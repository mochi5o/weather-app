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

export const getWeatherAndCity = async (lat: string, lon: string): Promise<WeatherResponse> => {
  const key = process.env.API_KEY;
  // 代表地点の緯度経度を取得
  const cityUrl = 'http://api.openweathermap.org/geo/1.0/reverse'
  const cityParams = await axios.get(cityUrl, {
    params: {
      lat: lat,
      lon: lon,
      limit: 1,
      appid: key,
    }
  });
  const city = cityParams.data[0];
  // 緯度経度から天気情報を取得
  const url = process.env.API_URL + '/weather' ?? '';
  const weatherParams = await axios.get(url, {
    params: {
      lat: city.lat,
      lon: city.lon,
      exclude: 'minutely,hourly',
      unit: 'metric',
      lang: 'ja',
      appid: key,
    }
  });
  const data = weatherParams.data;
  const response = {
    data,
    ...city
  };
  return response;
};
