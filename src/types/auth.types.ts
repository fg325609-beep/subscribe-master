export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  baseCurrency: Currency;
  createdAt: string;
}

export type Currency = "UZS" | "USD" | "EUR";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}