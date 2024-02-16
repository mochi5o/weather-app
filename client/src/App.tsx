import { useEffect, useState } from 'react';
import { Tabs, Tab, Container } from '@mui/material';
import Weather from './components/Weather';
import WeatherMap from './components/WeatherMap';

function App() {
  useEffect(() => {
    document.title = 'Weather App';
  }, []);

  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }
  return (
    <Container>
      <h2>Weather App</h2>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Weather" />
        <Tab label="Weather Map" />
      </Tabs>
      {value === 0 && <Weather />}
      {value === 1 && <WeatherMap />}
    </Container>
  );
}

export default App;
