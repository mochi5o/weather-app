import { useState } from 'react';
import {
  FormControl,
  Button,
  InputLabel,
  Input,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { getWeather } from '../api';

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

const Weather = () => {
  const [area, setArea] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleSubmit = async () => {
    try {
      const data = await getWeather(area);
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const styles = {
    inputArea: {
      width: '100%',
      padding: '20px',
    },
    inputForm: {
      width: '90%',
      margin: '0 0 2rem 0',
    },
  };

  return(
    <div style={styles.inputArea}>
      <FormControl sx={styles.inputForm}>
        <InputLabel htmlFor='area'>地名を入力</InputLabel>
        <Input
          id='area'
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <Button
          style={{ marginTop: '1rem' }}
          variant='contained'
          onClick={handleSubmit}
          disabled={!area}
        >
          Submit
        </Button>
      </FormControl>
      {weatherData && (
        <Card sx={{ maxWidth: '200px' }}>
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
        </Card>
      )}
    </div>
  );
}

export default Weather;
