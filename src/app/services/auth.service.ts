import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError, switchMap, map, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { API_URL, LOCAL_STORAGE } from '@app/core/tokens';
import { APIAuthResponse, APIUserInfo } from '@app/models/api.interface';
import { LoadingService } from './loading.service';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
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

  private readonly AUTH_TOKEN_KEY = 'authToken';
  private readonly USER_INFO_KEY = 'userInfo';

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private loadingService: LoadingService
  ) {
    // Initialize with stored auth state after constructor
    const storedState = this.getStoredAuthState();
    this.authStateSubject.next({
      isAuthenticated: storedState.isAuthenticated,
      user: storedState.user,
      token: storedState.token
    });
    this.restoreAuthState();
  }

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
   * Login user with username and password via HTTP POST
   * Sends credentials to backend and stores token in localStorage
   * @param username - User username or email
   * @param password - User password
   * @returns Observable of AuthState
   */
  login(username: string, password: string): Observable<AuthState> {
    this.loadingService.show();
    return this.http.post<APIAuthResponse>(
      `${this.apiUrl}/auth/login`,
      { email: username, password }
    ).pipe(
      tap(response => {
        this.localStorage.setItem(this.AUTH_TOKEN_KEY, response.token);
        // Update auth state after successful login
        const authState: AuthState = {
          isAuthenticated: true,
          user: {
            id: String(response.user?.id || '1'),
            email: response.user?.email || username,
            firstName: response.user?.name?.split(' ')[0] || username,
            lastName: response.user?.name?.split(' ')[1] || '',
            role: 'ADMIN' // Default role for login
          },
          token: response.token
        };
        this.localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(authState.user));
        this.authStateSubject.next(authState);
      }),
      switchMap(() => {
        // Fetch user info from backend to get actual role
        return this.http.get<APIUserInfo>(`${this.apiUrl}/auth/userinfo`).pipe(
          tap(userInfo => {
            const user: User = {
              id: String(userInfo.id),
              email: userInfo.email,
              firstName: userInfo.name.split(' ')[0],
              lastName: userInfo.name.split(' ')[1] || '',
              role: userInfo.role?.toUpperCase()
            };
            this.localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(user));
            const authState: AuthState = {
              isAuthenticated: true,
              user: user,
              token: this.localStorage.getItem(this.AUTH_TOKEN_KEY)
            };
            this.authStateSubject.next(authState);
          }),
          map(() => this.authStateSubject.value),
          catchError(error => {
            console.error('Failed to fetch user info:', error);
            // Return current auth state if fetch fails
            return of(this.authStateSubject.value);
          }),
          finalize(() => this.loadingService.hide())
        );
      }),
      catchError(error => {
        console.error('Login failed:', error);
        this.loadingService.hide();
        throw error;
      })
    );
  }

  /**
   * Fetch user information from backend
   * Requires valid auth token to be present in localStorage
   * Called automatically after successful login
   */
  private fetchUserInfo(): void {
    this.http.get<APIUserInfo>(`${this.apiUrl}/auth/userinfo`)
      .pipe(
        tap(userInfo => {
          const user: User = {
            id: String(userInfo.id),
            email: userInfo.email,
            firstName: userInfo.name.split(' ')[0],
            lastName: userInfo.name.split(' ')[1] || '',
            role: userInfo.role?.toUpperCase()
          };
          this.localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(user));
          const authState: AuthState = {
            isAuthenticated: true,
            user: user,
            token: this.localStorage.getItem(this.AUTH_TOKEN_KEY)
          };
          this.authStateSubject.next(authState);
        }),
        catchError(error => {
          console.error('Failed to fetch user info:', error);
          return of(null);
        })
      ).subscribe();
  }

  /**
   * Get user info from backend
   * @returns Observable of user information
   */
  getUser(): Observable<APIUserInfo> {
    return this.http.get<APIUserInfo>(`${this.apiUrl}/auth/userinfo`);
  }

  /**
   * Logout user - clear stored token and reset auth state
   */
  logout(): void {
    this.localStorage.removeItem(this.AUTH_TOKEN_KEY);
    this.localStorage.removeItem(this.USER_INFO_KEY);
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null
    });
  }

  /**
   * Get authentication token from storage
   */
  getToken(): string | null {
    return this.localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  /**
   * Restore authentication state from localStorage on service initialization
   */
  private restoreAuthState(): void {
    const token = this.localStorage.getItem(this.AUTH_TOKEN_KEY);
    const userInfoStr = this.localStorage.getItem(this.USER_INFO_KEY);

    if (token && userInfoStr) {
      try {
        const user = JSON.parse(userInfoStr);
        // Ensure role is always uppercase
        if (user.role) {
          user.role = user.role.toUpperCase();
        }
        this.authStateSubject.next({
          isAuthenticated: true,
          user: user,
          token: token
        });
      } catch (e) {
        console.error('Failed to restore auth state:', e);
        this.logout();
      }
    }
  }

  /**
   * Get stored authentication state from localStorage
   */
  private getStoredAuthState(): AuthState {
    const token = this.localStorage.getItem(this.AUTH_TOKEN_KEY);
    const userInfoStr = this.localStorage.getItem(this.USER_INFO_KEY);

    if (token && userInfoStr) {
      try {
        return {
          isAuthenticated: true,
          user: JSON.parse(userInfoStr),
          token: token
        };
      } catch {
        return {
          isAuthenticated: false,
          user: null,
          token: null
        };
      }
    }

    return {
      isAuthenticated: false,
      user: null,
      token: null
    };
  }
}
