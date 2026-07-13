'use client';

import React from 'react';
import { ForecastItem } from '@/types/weather.types';
import { Cloud, CloudRain, Sun } from 'lucide-react';

interface ForecastCardProps {
  item: ForecastItem;
  unit: 'metric' | 'imperial';
}

const getWeatherIcon = (iconCode: string, size: 'small' | 'medium' = 'small') => {
  const sizeClass = size === 'small' ? 'w-8 h-8' : 'w-12 h-12';
  const iconMap: { [key: string]: React.ReactNode } = {
    '01d': <Sun className={`${sizeClass} text-yellow-400`} />,
    '01n': <Sun className={`${sizeClass} text-gray-400`} />,
    '02d': <Cloud className={`${sizeClass} text-gray-400`} />,
    '02n': <Cloud className={`${sizeClass} text-gray-600`} />,
    '09d': <CloudRain className={`${sizeClass} text-blue-400`} />,
    '10d': <CloudRain className={`${sizeClass} text-blue-500`} />,
  };
  return iconMap[iconCode] || <Cloud className={sizeClass} />;
};

export const ForecastCard: React.FC<ForecastCardProps> = ({ item, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const date = new Date(item.dt * 1000);
  const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
      <p className="text-gray-600 text-sm font-medium mb-1">{dateString}</p>
      <p className="text-gray-400 text-xs mb-3">{timeString}</p>
      
      <div className="flex justify-center mb-3">
        {getWeatherIcon(item.weather[0].icon, 'medium')}
      </div>
      
      <p className="text-lg font-bold text-center mb-3">{Math.round(item.main.temp)}{tempUnit}</p>
      
      <p className="text-xs text-gray-600 text-center capitalize mb-2">{item.weather[0].main}</p>
      
      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex justify-between">
          <span>Humidity:</span>
          <span className="font-medium">{item.main.humidity}%</span>
        </div>
        <div className="flex justify-between">
          <span>Rain:</span>
          <span className="font-medium">{(item.rain?.['3h'] || 0).toFixed(1)} mm</span>
        </div>
      </div>
    </div>
  );
};
