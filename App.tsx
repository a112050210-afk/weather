import React, { useState, useEffect } from 'react';
import { CITIES } from './constants';
import { fetchWeatherData } from './services/weatherService';
import { WeatherData, City } from './types';
import WeatherIcon from './components/WeatherIcon';
import DetailsGrid from './components/DetailsGrid';
import CitySelector from './components/CitySelector';

// Spec Requirement: Sans-serif font, Glassmorphism, Immersive Background
const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<City>(CITIES[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Controls the fade-in animation of the background
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      const data = await fetchWeatherData(currentCity.id);
      setWeather(data);
      setLoading(false);
    };

    // Reset bg loaded state to trigger fade transition
    setBgLoaded(false);
    
    // Preload image to ensure smooth transition
    const img = new Image();
    img.src = currentCity.bgImage;
    img.onload = () => {
      setBgLoaded(true);
    };

    loadWeather();
  }, [currentCity]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans text-white select-none">
      
      {/* 1. Background Layer */}
      {/* Spec: "High intensity blur and dark overlay" */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${bgLoaded ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
        style={{ backgroundImage: `url(${currentCity.bgImage})` }}
      />
      {/* Overlay for readability and atmosphere */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      
      {/* Gradient Vignette for better focus */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-0 pointer-events-none" />

      {/* 2. Main Content Area */}
      <div className="relative z-10 flex flex-col h-full items-center pt-16 pb-32 w-full max-w-lg mx-auto">
        
        {/* City Name */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 drop-shadow-md text-center">
          {currentCity.name}
        </h1>
        <p className="text-white/60 text-sm mb-8 font-medium tracking-wide uppercase">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>

        {/* Main Display: Icon & Temp */}
        <div className="flex-1 flex flex-col items-center justify-center w-full mb-8">
            {/* Weather Icon */}
            <div className={`transition-all duration-700 transform ${loading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
               <WeatherIcon condition={weather?.condition || 'Cloudy'} size={180} />
            </div>

            {/* Temperature */}
            <div className="flex flex-col items-center mt-6">
              <div className="relative">
                <span 
                  className={`text-9xl font-bold tracking-tighter leading-none bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent transition-all duration-1000 ${loading ? 'opacity-0 blur-md' : 'opacity-100 blur-0'}`}
                >
                  {weather ? Math.round(weather.temp) : '--'}
                </span>
                <span className={`absolute top-4 -right-8 text-4xl text-white/80 font-light ${loading ? 'hidden' : 'block'}`}>°</span>
              </div>
              <span className={`mt-4 text-xl text-white/80 font-medium tracking-wider transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                {weather?.condition}
              </span>
            </div>
        </div>

        {/* Details Grid (Rain, Humidity, Wind) */}
        <DetailsGrid data={weather} loading={loading} />

      </div>

      {/* 3. Footer Control */}
      <CitySelector 
        currentCity={currentCity} 
        onSelectCity={setCurrentCity} 
      />
      
    </div>
  );
};

export default App;