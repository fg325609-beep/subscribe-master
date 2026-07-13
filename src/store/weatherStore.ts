import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeatherResponse, ForecastResponse, SavedLocation } from '@/types/weather.types';

interface WeatherState {
  // Current weather
  currentWeather: WeatherResponse | null;
  forecast: ForecastResponse | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  unit: 'metric' | 'imperial';
  
  // Saved locations
  savedLocations: SavedLocation[];
  currentLocationIndex: number;
  
  // Actions
  setCurrentWeather: (weather: WeatherResponse) => void;
  setForecast: (forecast: ForecastResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUnit: (unit: 'metric' | 'imperial') => void;
  addSavedLocation: (location: SavedLocation) => void;
  removeSavedLocation: (id: string) => void;
  setCurrentLocationIndex: (index: number) => void;
  clearAll: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      currentWeather: null,
      forecast: null,
      isLoading: false,
      error: null,
      unit: 'metric',
      savedLocations: [],
      currentLocationIndex: 0,

      setCurrentWeather: (weather) => set({ currentWeather: weather }),
      setForecast: (forecast) => set({ forecast }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setUnit: (unit) => set({ unit }),

      addSavedLocation: (location) =>
        set((state) => ({
          savedLocations: [
            ...state.savedLocations,
            location,
          ],
        })),

      removeSavedLocation: (id) =>
        set((state) => ({
          savedLocations: state.savedLocations.filter((loc) => loc.id !== id),
        })),

      setCurrentLocationIndex: (index) => set({ currentLocationIndex: index }),

      clearAll: () =>
        set({
          currentWeather: null,
          forecast: null,
          error: null,
        }),
    }),
    {
      name: 'weather-storage',
      partialize: (state) => ({
        unit: state.unit,
        savedLocations: state.savedLocations,
        currentLocationIndex: state.currentLocationIndex,
      }),
    }
  )
);
