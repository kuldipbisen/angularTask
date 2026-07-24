import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { API_URL, LOCAL_STORAGE } from '@app/core/tokens';
import { APIAuthResponse, APIUserInfo } from '@app/models/api.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let mockLocalStorage: any;

  const mockApiUrl = 'http://localhost:8080/api';
  const mockAuthResponse: APIAuthResponse = { token: 'jwt_token_123' };
  const mockUserInfo: APIUserInfo = {
    id: 1,
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user'
  };

  beforeEach(() => {
    const store: { [key: string]: string } = {};
    
    mockLocalStorage = {
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
        { provide: LOCAL_STORAGE, useValue: mockLocalStorage }
      ]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpTestingController) {
      httpTestingController.verify();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when not authenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return null user when not authenticated', () => {
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should return null token when not authenticated', () => {
    expect(service.getToken()).toBeNull();
  });

  describe('login', () => {
    it('should successfully login with credentials', fakeAsync(() => {
      // Test for successful login with credentials
      let resultState: any;
      let hasError = false;

      service.login('john@example.com', 'password123').subscribe({
        next: (state) => {
          resultState = state;
        },
        error: () => {
          hasError = true;
        }
      });

      const loginReq = httpTestingController.expectOne(`${mockApiUrl}/auth/login`);
      expect(loginReq.request.method).toBe('POST');
      loginReq.flush(mockAuthResponse);

      tick();

      const userReq = httpTestingController.expectOne(`${mockApiUrl}/auth/userinfo`);
      expect(userReq.request.method).toBe('GET');
      userReq.flush(mockUserInfo);

      flush();

      expect(hasError).toBe(false);
      expect(resultState).toBeDefined();
      expect(resultState.isAuthenticated).toBe(true);
      expect(resultState.token).toBe('jwt_token_123');
    }));

    it('should store token on successful login', fakeAsync(() => {
      service.login('john@example.com', 'password123').subscribe();

      const loginReq = httpTestingController.expectOne(`${mockApiUrl}/auth/login`);
      loginReq.flush(mockAuthResponse);
      tick();

      const userReq = httpTestingController.expectOne(`${mockApiUrl}/auth/userinfo`);
      userReq.flush(mockUserInfo);
      tick();

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('authToken', 'jwt_token_123');
    }));

    it('should handle login error', fakeAsync(() => {
      let errorOccurred = false;

      service.login('john@example.com', 'wrong').subscribe({
        error: () => { errorOccurred = true; }
      });

      const loginReq = httpTestingController.expectOne(`${mockApiUrl}/auth/login`);
      loginReq.error(new ErrorEvent('Unauthorized'), { status: 401 });
      tick();

      expect(errorOccurred).toBe(true);
    }));
  });

  describe('logout', () => {
    it('should clear auth state', fakeAsync(() => {
      service.login('john@example.com', 'password123').subscribe();

      const loginReq = httpTestingController.expectOne(`${mockApiUrl}/auth/login`);
      loginReq.flush(mockAuthResponse);
      tick();

      const userReq = httpTestingController.expectOne(`${mockApiUrl}/auth/userinfo`);
      userReq.flush(mockUserInfo);
      tick();

      expect(service.isAuthenticated()).toBe(true);

      service.logout();

      expect(service.isAuthenticated()).toBe(false);
      expect(service.getCurrentUser()).toBeNull();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('authToken');
    }));
  });

  describe('getUser', () => {
    it('should fetch user info from backend', fakeAsync(() => {
      let result: any;

      service.getUser().subscribe(user => {
        result = user;
      });

      const req = httpTestingController.expectOne(`${mockApiUrl}/auth/userinfo`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUserInfo);
      tick();

      expect(result.email).toBe('john@example.com');
    }));

    it('should handle fetch error', fakeAsync(() => {
      let errorOccurred = false;

      service.getUser().subscribe({
        error: () => { errorOccurred = true; }
      });

      const req = httpTestingController.expectOne(`${mockApiUrl}/auth/userinfo`);
      req.error(new ErrorEvent('Forbidden'), { status: 403 });
      tick();

      expect(errorOccurred).toBe(true);
    }));
  });

  describe('getAuthState', () => {
    it('should return auth state as observable', fakeAsync(() => {
      let state: any;

      service.getAuthState().subscribe(s => {
        state = s;
      });

      tick();

      expect(state).toBeDefined();
      expect(state.isAuthenticated).toBe(false);
    }));
  });

  describe('getCurrentAuthState', () => {
    it('should return current auth state', () => {
      const state = service.getCurrentAuthState();
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });
});
