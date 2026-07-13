export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherData[];
  main: MainWeatherInfo;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherInfo;
  weather: WeatherData[];
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    timezone: number;
  };
}

export interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  addedAt: string;
}
