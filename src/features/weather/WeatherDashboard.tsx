'use client';

import React, { useEffect, useState } from 'react';
import { useWeatherStore } from '@/store/weatherStore';
import { weatherService } from '@/services/weather.service';
import { SavedLocation, WeatherResponse, ForecastResponse } from '@/types/weather.types';
import { CurrentWeather } from '@/components/weather/CurrentWeather';
import { ForecastCard } from '@/components/weather/ForecastCard';
import { SearchBar } from '@/components/weather/SearchBar';
import { SavedLocations } from '@/components/weather/SavedLocations';
import { UnitToggle } from '@/components/weather/UnitToggle';
import { AlertCircle, Loader } from 'lucide-react';

export const WeatherDashboard: React.FC = () => {
  const {
    currentWeather,
    forecast,
    isLoading,
    error,
    unit,
    savedLocations,
    currentLocationIndex,
    setCurrentWeather,
    setForecast,
    setLoading,
    setError,
    setUnit,
    addSavedLocation,
    removeSavedLocation,
    setCurrentLocationIndex,
  } = useWeatherStore();

  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // Load default weather on mount
  useEffect(() => {
    if (!initialLoadDone && !currentWeather) {
      handleSearch('London');
      setInitialLoadDone(true);
    }
  }, [initialLoadDone, currentWeather]);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await weatherService.getCurrentWeatherByCity(city, unit);
      const forecast = await weatherService.getForecast(city, unit);

      setCurrentWeather(weather);
      setForecast(forecast);

      // Check if location is already saved
      const locationId = `${weather.name}-${weather.sys.country}`;
      const exists = savedLocations.some((loc) => loc.id === locationId);

      if (!exists) {
        // Optionally auto-save first search, or let user manually add
        const newLocation: SavedLocation = {
          id: locationId,
          name: weather.name,
          lat: weather.coord.lat,
          lon: weather.coord.lon,
          country: weather.sys.country,
          addedAt: new Date().toISOString(),
        };
        addSavedLocation(newLocation);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = async (location: SavedLocation) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await weatherService.getCurrentWeatherByCoords(
        location.lat,
        location.lon,
        unit
      );
      const forecast = await weatherService.getForecastByCoords(
        location.lat,
        location.lon,
        unit
      );

      setCurrentWeather(weather);
      setForecast(forecast);

      const index = savedLocations.findIndex((loc) => loc.id === location.id);
      if (index !== -1) {
        setCurrentLocationIndex(index);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLocation = (id: string) => {
    removeSavedLocation(id);
  };

  const handleUnitChange = async (newUnit: 'metric' | 'imperial') => {
    setUnit(newUnit);
    if (currentWeather) {
      // Refetch with new unit
      await handleSearch(currentWeather.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Weather Dashboard</h1>
          <p className="text-gray-600">Get real-time weather information for any location</p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Unit Toggle */}
        <UnitToggle unit={unit} onUnitChange={handleUnitChange} />

        {/* Saved Locations */}
        {savedLocations.length > 0 && (
          <SavedLocations
            locations={savedLocations}
            onSelect={handleLocationSelect}
            onRemove={handleRemoveLocation}
            currentIndex={currentLocationIndex}
          />
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="ml-3 text-gray-600 font-medium">Loading weather data...</span>
          </div>
        )}

        {/* Current Weather */}
        {currentWeather && !isLoading && (
          <div className="mb-8">
            <CurrentWeather weather={currentWeather} unit={unit} />
          </div>
        )}

        {/* Forecast */}
        {forecast && !isLoading && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5-Day Forecast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {forecast.list.slice(0, 8).map((item, index) => (
                <ForecastCard key={index} item={item} unit={unit} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!currentWeather && !isLoading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Search for a city to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
