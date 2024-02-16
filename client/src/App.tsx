import React, { useEffect, useState } from "react";
import Weather from './components/Weather';

function App() {
  useEffect(() => {
    document.title = "Weather App";
  }, []);
  return (
    <div>
      <p>
        Weather App
      </p>
      <Weather />
    </div>
  );
}

export default App;
