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
        <Tab label="Map" />
        <Tab label="Area" />
      </Tabs>
      {value === 0 && <WeatherMap />}
      {value === 1 && <Weather />}
    </Container>
  );
}

export default App;
