import React from 'react';
import { Umbrella, Droplets, Wind } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { WeatherData } from '../types';

interface DetailsGridProps {
  data: WeatherData | null;
  loading: boolean;
}

const DetailsGrid: React.FC<DetailsGridProps> = ({ data, loading }) => {
  const items = [
    {
      label: '降雨機率',
      value: data ? `${data.rainChance}%` : '--',
      icon: <Umbrella size={24} className="text-blue-300 mb-2" />,
    },
    {
      label: '濕度',
      value: data ? `${data.humidity}%` : '--',
      icon: <Droplets size={24} className="text-cyan-300 mb-2" />,
    },
    {
      label: '風速',
      value: data ? `${data.windSpeed} km/h` : '--',
      icon: <Wind size={24} className="text-gray-300 mb-2" />,
    },
  ];

  return (
    <div className="w-full max-w-md grid grid-cols-3 gap-4 px-6 mt-12">
      {items.map((item, index) => (
        <GlassCard key={index} className="flex flex-col items-center justify-center py-6 hover:bg-white/15 transition-colors duration-300">
          <div className={`transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
            {item.icon}
          </div>
          <span className="text-white/60 text-xs font-medium tracking-wide mb-1">{item.label}</span>
          <span className={`text-white text-lg font-bold transition-all duration-700 ${loading ? 'blur-sm scale-90' : 'blur-0 scale-100'}`}>
            {item.value}
          </span>
        </GlassCard>
      ))}
    </div>
  );
};

export default DetailsGrid;
