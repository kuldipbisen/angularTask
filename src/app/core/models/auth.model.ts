// Auth API Response Models
export interface AuthApiResponse {
  token: string;
  expiresIn: number;
  user: UserApiModel;
}

export interface UserApiModel {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Domain Models
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
