'use client';

import React from 'react';
import { WeatherResponse } from '@/types/weather.types';
import { Cloud, CloudRain, Sun, Wind, Eye, Droplets } from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherResponse;
  unit: 'metric' | 'imperial';
}

const getWeatherIcon = (iconCode: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    '01d': <Sun className="w-16 h-16 text-yellow-400" />,
    '01n': <Sun className="w-16 h-16 text-gray-400" />,
    '02d': <Cloud className="w-16 h-16 text-gray-400" />,
    '02n': <Cloud className="w-16 h-16 text-gray-600" />,
    '03d': <Cloud className="w-16 h-16 text-gray-400" />,
    '03n': <Cloud className="w-16 h-16 text-gray-600" />,
    '04d': <Cloud className="w-16 h-16 text-gray-500" />,
    '04n': <Cloud className="w-16 h-16 text-gray-700" />,
    '09d': <CloudRain className="w-16 h-16 text-blue-400" />,
    '09n': <CloudRain className="w-16 h-16 text-blue-600" />,
    '10d': <CloudRain className="w-16 h-16 text-blue-500" />,
    '10n': <CloudRain className="w-16 h-16 text-blue-700" />,
    '11d': <CloudRain className="w-16 h-16 text-purple-500" />,
    '11n': <CloudRain className="w-16 h-16 text-purple-700" />,
    '13d': <Cloud className="w-16 h-16 text-blue-200" />,
    '13n': <Cloud className="w-16 h-16 text-blue-400" />,
    '50d': <Cloud className="w-16 h-16 text-gray-400" />,
    '50n': <Cloud className="w-16 h-16 text-gray-600" />,
  };
  return iconMap[iconCode] || <Sun className="w-16 h-16" />;
};

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-8 text-white shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">{weather.name}, {weather.sys.country}</h2>
          <p className="text-blue-100 text-lg capitalize">{weather.weather[0].description}</p>
        </div>
        <div className="flex justify-end">
          {getWeatherIcon(weather.weather[0].icon)}
        </div>
      </div>

      {/* Main temperature */}
      <div className="mb-8">
        <div className="text-6xl font-bold mb-2">{Math.round(weather.main.temp)}{tempUnit}</div>
        <p className="text-blue-100">Feels like {Math.round(weather.main.feels_like)}{tempUnit}</p>
      </div>

      {/* Temperature range */}
      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-blue-300">
        <div>
          <p className="text-blue-100 text-sm">Min Temperature</p>
          <p className="text-2xl font-semibold">{Math.round(weather.main.temp_min)}{tempUnit}</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Max Temperature</p>
          <p className="text-2xl font-semibold">{Math.round(weather.main.temp_max)}{tempUnit}</p>
        </div>
      </div>

      {/* Weather details grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 bg-opacity-50 rounded p-4">
          <div className="flex items-center mb-2">
            <Droplets className="w-5 h-5 mr-2" />
            <p className="text-blue-100 text-sm">Humidity</p>
          </div>
          <p className="text-2xl font-semibold">{weather.main.humidity}%</p>
        </div>

        <div className="bg-blue-500 bg-opacity-50 rounded p-4">
          <div className="flex items-center mb-2">
            <Wind className="w-5 h-5 mr-2" />
            <p className="text-blue-100 text-sm">Wind Speed</p>
          </div>
          <p className="text-2xl font-semibold">{weather.wind.speed.toFixed(1)} {speedUnit}</p>
        </div>

        <div className="bg-blue-500 bg-opacity-50 rounded p-4">
          <div className="flex items-center mb-2">
            <Eye className="w-5 h-5 mr-2" />
            <p className="text-blue-100 text-sm">Visibility</p>
          </div>
          <p className="text-2xl font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
        </div>

        <div className="bg-blue-500 bg-opacity-50 rounded p-4">
          <p className="text-blue-100 text-sm mb-2">Pressure</p>
          <p className="text-2xl font-semibold">{weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};
