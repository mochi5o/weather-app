import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from '@emotion/styled';
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
} from '@mui/material';
import { getWeatherByLatLng } from '../api';

interface WeatherData {
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  }
  name: string;
}

const WeatherCard = styled(Card)`
  position: absolute;
  top: 20px;
  left: 70px;
  z-index: 1000;
  max-width: 300px;
`;

function MapClickHandler() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      const fetchWeatherData = async () => {
        setIsLoading(true);
        const response = await getWeatherByLatLng(lat, lng);
        setWeatherData(response);
        setIsLoading(false);
      };
      fetchWeatherData();
    },
  });

  if (isLoading) {
    return null;
  } else {
    return weatherData ? (
      <WeatherCard>
        <CardMedia
          component="img"
          height="140"
          image={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="Weather icon"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {weatherData.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {weatherData.weather[0].description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            気温 {weatherData.main.temp} °C
          </Typography>
        </CardContent>
      </WeatherCard>
    ) : null;
  }
}

const MapContainerWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const WeatherMap: React.FC = () => {
  // デフォルト: 東京の緯度経度
  const center: [number, number] = [35.6895, 139.6917];

  return (
    <MapContainerWrapper>
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: '50vh', width: '90%' }}
      >
        <TileLayer
          url='https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'
        />
        <MapClickHandler />
      </MapContainer>
    </MapContainerWrapper>
  );
};

export default WeatherMap;
