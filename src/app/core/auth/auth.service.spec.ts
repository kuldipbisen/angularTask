import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { API_URL, LOCAL_STORAGE } from '../tokens';
import { AuthCredentials, AuthState } from '../models';
import { AuthenticationError, ValidationError } from '../errors';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let localStorageMock: Storage;

  const mockApiUrl = 'http://localhost:3004';
  const mockAuthResponse = {
    token: 'mock-token-123',
    expiresIn: 3600,
    user: {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
    },
  };

  beforeEach(() => {
    const store: { [key: string]: string } = {};
    
    localStorageMock = {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach(key => delete store[key]);
      }),
      length: 0,
      key: jest.fn().mockReturnValue(null),
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: API_URL, useValue: mockApiUrl },
        { provide: LOCAL_STORAGE, useValue: localStorageMock },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  describe('login', () => {
    it('should login successfully with valid credentials', (done) => {
      const credentials: AuthCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      service.login(credentials).subscribe((state) => {
        expect(state.isAuthenticated).toBe(true);
        expect(state.user?.email).toBe('test@example.com');
        expect(state.token).toBe('mock-token-123');
        done();
      });

      const req = httpMock.expectOne(`${mockApiUrl}/auth/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);
      req.flush(mockAuthResponse);
    });

    it('should fail without email', (done) => {
      const credentials: any = {
        password: 'password123',
      };

      service.login(credentials).subscribe(
        () => {
          fail('should have failed');
        },
        (error) => {
          expect(error instanceof ValidationError).toBe(true);
          done();
        }
      );
    });

    it('should fail without password', (done) => {
      const credentials: any = {
        email: 'test@example.com',
      };

      service.login(credentials).subscribe(
        () => {
          fail('should have failed');
        },
        (error) => {
          expect(error instanceof ValidationError).toBe(true);
          done();
        }
      );
    });

    it('should handle 401 response', (done) => {
      const credentials: AuthCredentials = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      service.login(credentials).subscribe(
        () => {
          fail('should have failed');
        },
        (error) => {
          expect(error instanceof AuthenticationError).toBe(true);
          done();
        }
      );

      const req = httpMock.expectOne(`${mockApiUrl}/auth/login`);
      req.flush(
        { message: 'Invalid credentials' },
        { status: 401, statusText: 'Unauthorized' }
      );
    });
  });

  describe('register', () => {
    it('should register successfully with valid data', () => {
      const registerData = {
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User',
      };

      service.register(registerData).subscribe((state) => {
        expect(state.isAuthenticated).toBe(true);
        expect(state.user?.email).toBe('test@example.com');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/auth/register`);
      expect(req.request.method).toBe('POST');
      req.flush(mockAuthResponse);
    });

    it('should fail without required registration fields', (done) => {
      const invalidData: any = {
        email: 'test@example.com',
      };

      service.register(invalidData).subscribe(
        () => {
          fail('should have failed');
        },
        (error) => {
          expect(error instanceof ValidationError).toBe(true);
          done();
        }
      );
    });
  });

  describe('logout', () => {
    it('should logout successfully', () => {
      service.logout().subscribe();

      const req = httpMock.expectOne(`${mockApiUrl}/auth/logout`);
      expect(req.request.method).toBe('POST');
      req.flush(null);

      expect(service.isAuthenticated()).toBe(false);
    });

    it('should clear auth state even if logout fails', (done) => {
      service.logout().subscribe(() => {
        expect(service.isAuthenticated()).toBe(false);
        done();
      });

      const req = httpMock.expectOne(`${mockApiUrl}/auth/logout`);
      req.error(new ProgressEvent('error'));
    });
  });

  describe('isAuthenticated', () => {
    it('should return false initially', () => {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should return true after login', () => {
      const credentials: AuthCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      service.login(credentials).subscribe();

      const req = httpMock.expectOne(`${mockApiUrl}/auth/login`);
      req.flush(mockAuthResponse);

      expect(service.isAuthenticated()).toBe(true);
    });
  });

  describe('getCurrentUser', () => {
    it('should return null when not authenticated', () => {
      expect(service.getCurrentUser()).toBeNull();
    });

    it('should return user after login', () => {
      const credentials: AuthCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      service.login(credentials).subscribe();

      const req = httpMock.expectOne(`${mockApiUrl}/auth/login`);
      req.flush(mockAuthResponse);

      const user = service.getCurrentUser();
      expect(user?.email).toBe('test@example.com');
    });
  });

  describe('getToken', () => {
    it('should return null when not authenticated', () => {
      expect(service.getToken()).toBeNull();
    });

    it('should return token after login', () => {
      const credentials: AuthCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      service.login(credentials).subscribe();

      const req = httpMock.expectOne(`${mockApiUrl}/auth/login`);
      req.flush(mockAuthResponse);

      expect(service.getToken()).toBe('mock-token-123');
    });
  });

  describe('getAuthState', () => {
    it('should return auth state as observable', (done) => {
      service.getAuthState().subscribe((state) => {
        expect(state.isAuthenticated).toBe(false);
        done();
      });
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', () => {
      // First login
      const credentials: AuthCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      service.login(credentials).subscribe();

      const loginReq = httpMock.expectOne(`${mockApiUrl}/auth/login`);
      loginReq.flush(mockAuthResponse);

      // Then refresh
      service.refreshToken().subscribe((state) => {
        expect(state.isAuthenticated).toBe(true);
      });

      const refreshReq = httpMock.expectOne(`${mockApiUrl}/auth/refresh`);
      expect(refreshReq.request.method).toBe('POST');
      refreshReq.flush(mockAuthResponse);
    });

    it('should fail if no token available', (done) => {
      service.refreshToken().subscribe(
        () => {
          fail('should have failed');
        },
        (error) => {
          expect(error instanceof AuthenticationError).toBe(true);
          done();
        }
      );
    });
  });
});
