import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { API_URL, LOCAL_STORAGE } from '../tokens';
import {
  AuthCredentials,
  AuthState,
  AuthToken,
  User,
} from '../models';
import { AuthMapper } from '../mappers';
import {
  AppError,
  AuthenticationError,
  ErrorHandler,
  ServerError,
  ValidationError,
} from '../errors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'auth_token';
  private readonly AUTH_STATE_KEY = 'auth_state';

  private authState$ = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {
    this.initializeAuthState();
  }

  /**
   * Initialize authentication state from local storage
   */
  private initializeAuthState(): void {
    try {
      const savedState = this.localStorage.getItem(this.AUTH_STATE_KEY);
      if (savedState) {
        const state = JSON.parse(savedState);
        this.authState$.next(state);
      }
    } catch (error) {
      console.error('Failed to initialize auth state:', error);
    }
  }

  /**
   * Get authentication state as Observable
   */
  getAuthState(): Observable<AuthState> {
    return this.authState$.asObservable();
  }

  /**
   * Get current authentication state value
   */
  getCurrentAuthState(): AuthState {
    return this.authState$.getValue();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authState$.getValue().isAuthenticated;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.authState$.getValue().user;
  }

  /**
   * Get current auth token
   */
  getToken(): string | null {
    return this.authState$.getValue().token;
  }

  /**
   * Login with email and password
   */
  login(credentials: AuthCredentials): Observable<AuthState> {
    return this.validateCredentials(credentials).pipe(
      switchMap(() => this.http.post<any>(`${this.apiUrl}/auth/login`, credentials)),
      map(response => this.processAuthResponse(response)),
      tap(state => this.updateAuthState(state)),
      catchError(error => this.handleAuthError(error))
    );
  }

  /**
   * Register new user
   */
  register(credentials: AuthCredentials & { name: string }): Observable<AuthState> {
    return this.validateRegistration(credentials).pipe(
      switchMap(() => this.http.post<any>(`${this.apiUrl}/auth/register`, credentials)),
      map(response => this.processAuthResponse(response)),
      tap(state => this.updateAuthState(state)),
      catchError(error => this.handleAuthError(error))
    );
  }

  /**
   * Logout user
   */
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap(() => this.clearAuthState()),
      catchError(error => {
        // Clear state even if logout fails
        this.clearAuthState();
        return of(void 0);
      })
    );
  }

  /**
   * Refresh authentication token
   */
  refreshToken(): Observable<AuthState> {
    const currentToken = this.getToken();
    if (!currentToken) {
      return throwError(() => new AuthenticationError('No token available to refresh'));
    }

    return this.http.post<any>(`${this.apiUrl}/auth/refresh`, { token: currentToken }).pipe(
      map(response => this.processAuthResponse(response)),
      tap(state => this.updateAuthState(state)),
      catchError(error => this.handleAuthError(error))
    );
  }

  /**
   * Validate login credentials
   */
  private validateCredentials(credentials: AuthCredentials): Observable<void> {
    if (!credentials.email || !credentials.password) {
      return throwError(
        () => new ValidationError('Email and password are required', {
          email: !credentials.email ? 'Email is required' : undefined,
          password: !credentials.password ? 'Password is required' : undefined,
        })
      );
    }
    return of(void 0);
  }

  /**
   * Validate registration data
   */
  private validateRegistration(data: AuthCredentials & { name: string }): Observable<void> {
    const errors: Record<string, string> = {};

    if (!data.email) errors['email'] = 'Email is required';
    if (!data.password) errors['password'] = 'Password is required';
    if (!data.name) errors['name'] = 'Name is required';

    if (Object.keys(errors).length > 0) {
      return throwError(() => new ValidationError('Registration validation failed', errors));
    }

    return of(void 0);
  }

  /**
   * Process authentication API response
   */
  private processAuthResponse(response: any): AuthState {
    try {
      const { token, user } = AuthMapper.mapAuthApiResponseToDomain(response);

      return {
        isAuthenticated: true,
        user,
        token: token.token,
      };
    } catch (error) {
      throw new ServerError('Failed to process authentication response');
    }
  }

  /**
   * Update authentication state
   */
  private updateAuthState(state: AuthState): void {
    this.authState$.next(state);
    try {
      this.localStorage.setItem(this.AUTH_STATE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save auth state:', error);
    }
  }

  /**
   * Clear authentication state
   */
  private clearAuthState(): void {
    this.authState$.next({
      isAuthenticated: false,
      user: null,
      token: null,
    });

    try {
      this.localStorage.removeItem(this.AUTH_STATE_KEY);
      this.localStorage.removeItem(this.AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear auth state:', error);
    }
  }

  /**
   * Handle authentication errors
   */
  private handleAuthError(error: HttpErrorResponse | unknown): Observable<never> {
    let appError: AppError;

    if (error instanceof HttpErrorResponse) {
      const status = error.status;
      const errorData = error.error || {};

      switch (status) {
        case 400:
          appError = new ValidationError(
            errorData.message || 'Invalid credentials',
            errorData.details
          );
          break;
        case 401:
          appError = new AuthenticationError(
            errorData.message || 'Invalid email or password'
          );
          break;
        case 409:
          appError = new AppError(
            errorData.message || 'Email already exists',
            'CONFLICT_ERROR',
            409
          );
          break;
        case 500:
          appError = new ServerError(errorData.message || 'Server error');
          break;
        default:
          appError = new AppError(
            errorData.message || 'Authentication failed',
            errorData.code || 'AUTH_ERROR',
            status
          );
      }
    } else {
      appError = ErrorHandler.handle(error);
    }

    return throwError(() => appError);
  }
}
