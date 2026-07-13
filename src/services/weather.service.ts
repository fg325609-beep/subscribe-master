import { apiClient } from './api/client';
import { WeatherResponse, ForecastResponse } from '@/types/weather.types';

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo';
const WEATHER_BASE_URL = 'https://api.openweathermap.org';

export const weatherService = {
  // Get current weather by city name
  getCurrentWeatherByCity: async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherResponse> => {
    try {
      const response = await fetch(
        `${WEATHER_BASE_URL}/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=${units}`
      );
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch current weather:', error);
      throw error;
    }
  },

  // Get current weather by coordinates
  getCurrentWeatherByCoords: async (
    lat: number,
    lon: number,
    units: 'metric' | 'imperial' = 'metric'
  ): Promise<WeatherResponse> => {
    try {
      const response = await fetch(
        `${WEATHER_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${units}`
      );
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch current weather by coords:', error);
      throw error;
    }
  },

  // Get 5-day forecast
  getForecast: async (
    city: string,
    units: 'metric' | 'imperial' = 'metric'
  ): Promise<ForecastResponse> => {
    try {
      const response = await fetch(
        `${WEATHER_BASE_URL}/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=${units}`
      );
      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch forecast:', error);
      throw error;
    }
  },

  // Get forecast by coordinates
  getForecastByCoords: async (
    lat: number,
    lon: number,
    units: 'metric' | 'imperial' = 'metric'
  ): Promise<ForecastResponse> => {
    try {
      const response = await fetch(
        `${WEATHER_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${units}`
      );
      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch forecast by coords:', error);
      throw error;
    }
  },
};
