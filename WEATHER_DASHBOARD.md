# Weather Dashboard Feature

## Overview

Weather Dashboard is a real-time weather application that fetches data from OpenWeatherMap API. It provides current weather information, 5-day forecasts, and saved location management with local storage.

## Features

### 🌤️ Current Weather Display
- Real-time temperature and weather conditions
- Feels-like temperature
- Min/Max temperature range
- Humidity, wind speed, visibility, and pressure
- Weather icons based on conditions
- Location and country information

### 📊 5-Day Forecast
- Hourly forecast cards
- Temperature trends
- Precipitation data
- Weather conditions for each time slot

### 🔍 Search Functionality
- Search cities by name
- Real-time weather fetch
- Error handling for invalid cities
- Loading states

### 📍 Saved Locations
- Save favorite locations
- Quick access to saved cities
- Remove unwanted locations
- Currently viewing indicator
- Persistent storage using localStorage

### 🌡️ Unit Toggle
- Switch between Celsius and Fahrenheit
- Metric and Imperial units
- Automatic data refetch on unit change
- Persistent preference storage

## File Structure

```
src/
├── types/
│   └── weather.types.ts          # TypeScript interfaces for weather data
├── services/
│   └── weather.service.ts        # OpenWeatherMap API integration
├── store/
│   └── weatherStore.ts           # Zustand state management
├── components/weather/
│   ├── CurrentWeather.tsx        # Current weather display
│   ├── ForecastCard.tsx          # Individual forecast card
│   ├── SearchBar.tsx             # City search input
│   ├── SavedLocations.tsx        # Saved locations list
│   └── UnitToggle.tsx            # Temperature unit toggle
├── features/weather/
│   └── WeatherDashboard.tsx      # Main dashboard component
└── app/weather/
    └── page.tsx                  # Page route
```

## Setup

### 1. Get API Key

Sign up at [OpenWeatherMap](https://openweathermap.org/api) and get a free API key.

### 2. Environment Configuration

Create `.env.local` file:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

### 3. Install Dependencies

All required dependencies are already in `package.json`:
- React 19+
- Lucide-react (for icons)
- Zustand (for state management)

### 4. Run Application

```bash
npm run dev
```

Access the weather dashboard at `http://localhost:3000/weather`

## Data Flow

1. **Search for City**
   - User enters city name in SearchBar
   - weatherService.getCurrentWeatherByCity() fetches data
   - Data stored in weatherStore (Zustand)
   - Location automatically saved to savedLocations

2. **View Saved Location**
   - User clicks on saved location
   - weatherService.getCurrentWeatherByCoords() fetches new data
   - Weather display updates
   - Current location index updated

3. **Change Units**
   - User toggles between °C/°F
   - Unit preference persisted to localStorage
   - Current weather data refetched with new unit
   - All displays update automatically

## Local Storage Structure

```json
{
  "weather-storage": {
    "state": {
      "unit": "metric",
      "savedLocations": [
        {
          "id": "London-GB",
          "name": "London",
          "lat": 51.5085,
          "lon": -0.1257,
          "country": "GB",
          "addedAt": "2024-01-01T12:00:00Z"
        }
      ],
      "currentLocationIndex": 0
    }
  }
}
```

## API Endpoints Used

### Current Weather
```
GET /data/2.5/weather?q={city}&appid={API_KEY}&units={metric|imperial}
GET /data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units={metric|imperial}
```

### Forecast (5 days)
```
GET /data/2.5/forecast?q={city}&appid={API_KEY}&units={metric|imperial}
GET /data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units={metric|imperial}
```

## Types

### WeatherResponse
```typescript
interface WeatherResponse {
  coord: { lon: number; lat: number };
  weather: WeatherData[];
  main: MainWeatherInfo;
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  sys: { country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
```

### SavedLocation
```typescript
interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  addedAt: string;
}
```

## Error Handling

- Invalid city names: "City not found" error message
- Network errors: Displayed to user
- API rate limiting: Handled with retry logic
- Missing API key: Falls back to demo mode

## Performance Optimizations

1. **Lazy Loading**: Components render only when needed
2. **Memoization**: useWeatherStore optimizes re-renders
3. **Local Storage**: Reduces API calls for saved locations
4. **Efficient Updates**: Zustand partial state updates

## Future Enhancements

- [ ] Geolocation-based weather
- [ ] Weather alerts and warnings
- [ ] Historical weather data
- [ ] Air quality index
- [ ] Weather maps and radar
- [ ] Multiple language support
- [ ] Dark mode
- [ ] Push notifications

## Troubleshooting

### "Weather API error" message
- Check your OpenWeatherMap API key
- Ensure API key is added to `.env.local`
- Verify API quota hasn't been exceeded

### Empty saved locations
- Clear browser localStorage
- Restart the application
- Search for a new city to initialize

### Unit toggle not working
- Check browser console for errors
- Verify API key is valid
- Try refreshing the page

## License

This feature is part of Subscribe Master application.
