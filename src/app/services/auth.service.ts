import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  private users: Map<string, { password: string; user: User }> = new Map([
    ['john@example.com', {
      password: 'password123',
      user: {
        id: '1',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    }],
    ['jane@example.com', {
      password: 'password456',
      user: {
        id: '2',
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith'
      }
    }]
  ]);

  constructor() {}

  /**
   * Get the current authentication state as Observable
   */
  getAuthState(): Observable<AuthState> {
    return this.authStateSubject.asObservable();
  }

  /**
   * Get current authentication state
   */
  getCurrentAuthState(): AuthState {
    return this.authStateSubject.value;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  /**
   * Login user with email and password
   */
  login(email: string, password: string): Observable<AuthState> {
    const userCredentials = this.users.get(email);

    if (userCredentials && userCredentials.password === password) {
      const token = this.generateToken(email);
      const newAuthState: AuthState = {
        isAuthenticated: true,
        user: userCredentials.user,
        token: token
      };
      this.authStateSubject.next(newAuthState);
      return new Observable(observer => {
        observer.next(newAuthState);
        observer.complete();
      });
    }

    const error = new Error('Invalid email or password');
    return new Observable(observer => {
      observer.error(error);
    });
  }

  /**
   * Register a new user
   */
  register(email: string, password: string, firstName: string, lastName: string): Observable<AuthState> {
    if (this.users.has(email)) {
      const error = new Error('User already exists');
      return new Observable(observer => {
        observer.error(error);
      });
    }

    const newUser: User = {
      id: String(this.users.size + 1),
      email,
      firstName,
      lastName
    };

    this.users.set(email, { password, user: newUser });

    const token = this.generateToken(email);
    const newAuthState: AuthState = {
      isAuthenticated: true,
      user: newUser,
      token: token
    };

    this.authStateSubject.next(newAuthState);
    return new Observable(observer => {
      observer.next(newAuthState);
      observer.complete();
    });
  }

  /**
   * Logout user
   */
  logout(): void {
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null
    });
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  /**
   * Generate a mock token
   */
  private generateToken(email: string): string {
    return btoa(`${email}:${Date.now()}`);
  }
}
