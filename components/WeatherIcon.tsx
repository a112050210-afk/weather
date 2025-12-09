import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 120 }) => {
  // Using Tailwind colors and filters to simulate a 3D/Glassy look
  const iconStyle = {
    filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))',
  };

  switch (condition) {
    case 'Sunny':
      return (
        <div className="relative" style={{ width: size, height: size }}>
          <Sun 
            size={size} 
            className="text-yellow-400 fill-yellow-400 animate-pulse-slow" 
            style={iconStyle} 
            strokeWidth={1.5}
          />
        </div>
      );
    case 'Rainy':
      return (
         <div className="relative" style={{ width: size, height: size }}>
          <CloudRain 
            size={size} 
            className="text-blue-400 fill-blue-500/20" 
            style={iconStyle} 
            strokeWidth={1.5}
          />
        </div>
      );
    case 'Stormy':
      return (
        <div className="relative" style={{ width: size, height: size }}>
          <CloudLightning 
            size={size} 
            className="text-purple-400 fill-purple-500/20" 
            style={iconStyle} 
            strokeWidth={1.5}
          />
        </div>
      );
    case 'Snowy':
      return (
        <div className="relative" style={{ width: size, height: size }}>
          <Snowflake 
            size={size} 
            className="text-cyan-200 fill-white/20" 
            style={iconStyle} 
            strokeWidth={1.5}
          />
        </div>
      );
    case 'Cloudy':
    default:
      return (
        <div className="relative" style={{ width: size, height: size }}>
          <Cloud 
            size={size} 
            className="text-gray-200 fill-white/10" 
            style={iconStyle} 
            strokeWidth={1.5}
          />
        </div>
      );
  }
};

export default WeatherIcon;
