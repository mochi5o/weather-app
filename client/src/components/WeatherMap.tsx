import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from '@emotion/styled';
import { getWeatherByLatLng } from '../api';

function MapClickHandler() {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log(`緯度: ${lat}, 経度: ${lng}`);
      const weatherData = getWeatherByLatLng(lat, lng);
      console.log(weatherData);
    },
  });

  return null;
}

const MapContainerWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

// TODO: 結果のレンダリング
const WeatherMap: React.FC = () => {
  const center: [number, number] = [35.6895, 139.6917];

  return (
    <MapContainerWrapper>
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: '100vh', width: '80%' }}
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
