export interface WeatherData {
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy' | 'Snowy';
  rainChance: number;
  humidity: number;
  windSpeed: number;
  windDirection: string; // e.g., 'NE', 'SW'
}

export interface City {
  id: string;
  name: string;
  localName: string;
  bgImage: string; // URL to Unsplash image
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}
