import { useEffect } from 'react';
import styled from '@emotion/styled';
import Weather from './components/Weather';
import WeatherMap from './components/WeatherMap';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 140vh;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

function App() {
  useEffect(() => {
    document.title = 'Weather App';
  }, []);

  return (
    <Container>
      <h2>Weather App</h2>
      <Weather />
      <WeatherMap />
    </Container>
  );
}

export default App;
