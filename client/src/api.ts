import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getWeather = async (area: string) => {
  const url = `${BASE_URL}/weather-by-city?city=${area}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getWeatherByLatLng = async (lat: number, lon: number) => {
  const url = 'http://localhost:3333/api/v1/weather';
  try {
    const response = await axios.get(url, {
      params: {
        lat: lat,
        lon: lon
      }
    });
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}
