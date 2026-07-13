import React from 'react';
import { WeatherDashboard } from '@/features/weather/WeatherDashboard';

export const metadata = {
  title: 'Weather Dashboard',
  description: 'Real-time weather information for any location',
};

export default function WeatherPage() {
  return <WeatherDashboard />;
}
