import React from 'react';
import { FormControl, Button, TextField, InputLabel, Input } from '@mui/material';

const Weather = () => {
  return(
    <div>
      <h2>地域を入力</h2>
      <FormControl>
        <InputLabel htmlFor="area">Area</InputLabel>
        <Input id="area" aria-describedby="my-helper-text" />
        <Button variant="contained">Contained</Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
      </FormControl>
    </div>
  );
}

export default Weather;
