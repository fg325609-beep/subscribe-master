import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';

export function requestInterceptor(config: InternalAxiosRequestConfig) {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export function requestErrorInterceptor(error: AxiosError) {
  return Promise.reject(error);
}

export function responseErrorInterceptor(error: AxiosError) {
  if (error.response?.status === 401) {
    useAuthStore.getState().logout();
  }

  return Promise.reject(error);
}