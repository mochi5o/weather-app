import { useState } from 'react';
import { FormControl, Button, InputLabel, Input } from '@mui/material';
import { getWeather } from '../api';

const Weather = () => {
  const [area, setArea] = useState('');

  const handleSubmit = async () => {
    try {
      const data = await getWeather(area);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const styles = {
    inputArea: {
      width: '100%',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      '@media (maxWidth: 600px)': {
        padding: '10px',
      },
    },
    inputForm: {
      width: '90%',
      margin: '0 0 2rem 0',
      '@media (maxWidth: 600px)': {
        fontSize: '14px',
      },
    },
  };

  // TODO: 結果のレンダリング
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
    </div>
  );
}

export default Weather;
