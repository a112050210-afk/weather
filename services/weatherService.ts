import { WeatherData } from '../types';

// Simulating API latency and varying data based on city
export const fetchWeatherData = async (cityId: string): Promise<WeatherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Deterministic pseudo-random data based on city name length to keep it consistent but different
      const baseTemp = cityId === 'taipei' ? 24 : cityId === 'london' ? 12 : 18;
      
      const mockData: WeatherData = {
        temp: baseTemp,
        condition: cityId === 'taipei' ? 'Cloudy' : cityId === 'london' ? 'Rainy' : 'Sunny',
        rainChance: cityId === 'london' || cityId === 'taipei' ? 60 : 10,
        humidity: cityId === 'tokyo' ? 45 : 82,
        windSpeed: cityId === 'newyork' ? 28 : 12,
        windDirection: 'NE'
      };

      resolve(mockData);
    }, 800); // 800ms loading simulation
  });
};
