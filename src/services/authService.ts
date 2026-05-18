import { api } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/login', credentials);
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/register', data);
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  },

  removeToken(): void {
    localStorage.removeItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};