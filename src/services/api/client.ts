import axios from "axios";
import { requestInterceptor, responseErrorInterceptor } from "./interceptors";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(
  (response) => response,
  responseErrorInterceptor
);

export { apiClient };