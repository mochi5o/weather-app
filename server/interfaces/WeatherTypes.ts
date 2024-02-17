export interface WeatherResponse {
  main: {
    temp: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  weather: {
    description: string | '';
    icon: string | '';
  }[];
  name: string | '';
  cod: number;
  dt: number;
  message?: string;
}
