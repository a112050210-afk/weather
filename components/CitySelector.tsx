import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronUp } from 'lucide-react';
import { CITIES } from '../constants';
import { City } from '../types';

interface CitySelectorProps {
  currentCity: City;
  onSelectCity: (city: City) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ currentCity, onSelectCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: City) => {
    // Simulate Haptic Feedback (Vibration)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    onSelectCity(city);
    setIsOpen(false);
  };

  return (
    <div 
      className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-4"
      ref={containerRef}
    >
      <div className="relative w-full max-w-xs">
        {/* Dropdown Menu (Animate upwards) */}
        <div 
          className={`absolute bottom-full left-0 right-0 mb-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ease-out origin-bottom shadow-2xl ${
            isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="flex flex-col max-h-64 overflow-y-auto no-scrollbar">
            {CITIES.map((city) => (
              <button
                key={city.id}
                onClick={() => handleSelect(city)}
                className={`flex items-center justify-between px-6 py-4 text-left transition-colors ${
                  currentCity.id === city.id 
                    ? 'bg-white/20 text-white font-bold' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-sm">{city.name}</span>
                {currentCity.id === city.id && <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* The Capsule Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-between px-6 shadow-lg active:scale-95 transition-all duration-200 group hover:bg-white/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
              <MapPin size={20} className="text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-white/50 text-[10px] uppercase tracking-wider font-bold">Current Location</span>
              <span className="text-white font-semibold">{currentCity.name}</span>
            </div>
          </div>
          
          <ChevronUp 
            size={20} 
            className={`text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          />
        </button>
      </div>
    </div>
  );
};

export default CitySelector;
