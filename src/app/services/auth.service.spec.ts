import { TestBed } from '@angular/core/testing';
import { AuthService, User, AuthState } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    service.logout();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize with unauthenticated state', () => {
      const authState = service.getCurrentAuthState();
      expect(authState.isAuthenticated).toBe(false);
      expect(authState.user).toBeNull();
      expect(authState.token).toBeNull();
    });

    it('should not be authenticated initially', () => {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should have no current user initially', () => {
      expect(service.getCurrentUser()).toBeNull();
    });

    it('should have no token initially', () => {
      expect(service.getToken()).toBeNull();
    });
  });

  describe('getAuthState', () => {
    it('should return an observable of auth state', (done) => {
      service.getAuthState().subscribe(authState => {
        expect(authState).toBeDefined();
        expect(authState.isAuthenticated).toBe(false);
        done();
      });
    });

    it('should emit state changes', (done) => {
      let emissionCount = 0;
      service.getAuthState().subscribe(authState => {
        emissionCount++;
        if (emissionCount === 2) {
          expect(authState.isAuthenticated).toBe(true);
          done();
        }
      });

      service.login('john@example.com', 'password123').subscribe();
    });
  });

  describe('login', () => {
    it('should successfully login with correct credentials', (done) => {
      service.login('john@example.com', 'password123').subscribe({
        next: (authState) => {
          expect(authState.isAuthenticated).toBe(true);
          expect(authState.user).toBeDefined();
          expect(authState.user?.email).toBe('john@example.com');
          expect(authState.token).toBeDefined();
          done();
        },
        error: () => fail('Login should succeed')
      });
    });

    it('should set current user after successful login', (done) => {
      service.login('jane@example.com', 'password456').subscribe({
        next: () => {
          const currentUser = service.getCurrentUser();
          expect(currentUser).toBeDefined();
          expect(currentUser?.firstName).toBe('Jane');
          expect(currentUser?.lastName).toBe('Smith');
          done();
        }
      });
    });

    it('should generate a token on successful login', (done) => {
      service.login('john@example.com', 'password123').subscribe({
        next: () => {
          const token = service.getToken();
          expect(token).toBeDefined();
          expect(typeof token).toBe('string');
          done();
        }
      });
    });

    it('should fail with incorrect password', (done) => {
      service.login('john@example.com', 'wrongpassword').subscribe({
        next: () => fail('Login should fail'),
        error: (error) => {
          expect(error).toBeDefined();
          expect(error.message).toContain('Invalid email or password');
          done();
        }
      });
    });

    it('should fail with non-existent email', (done) => {
      service.login('nonexistent@example.com', 'password123').subscribe({
        next: () => fail('Login should fail'),
        error: (error) => {
          expect(error).toBeDefined();
          expect(error.message).toContain('Invalid email or password');
          done();
        }
      });
    });

    it('should update authentication state after login', (done) => {
      expect(service.isAuthenticated()).toBe(false);

      service.login('john@example.com', 'password123').subscribe({
        next: () => {
          expect(service.isAuthenticated()).toBe(true);
          done();
        }
      });
    });

    it('should not change state on failed login', (done) => {
      service.login('john@example.com', 'wrongpassword').subscribe({
        next: () => fail('Login should fail'),
        error: () => {
          expect(service.isAuthenticated()).toBe(false);
          expect(service.getCurrentUser()).toBeNull();
          done();
        }
      });
    });
  });

  describe('register', () => {
    it('should successfully register a new user', (done) => {
      service.register('newuser@example.com', 'securepass123', 'John', 'Doe').subscribe({
        next: (authState) => {
          expect(authState.isAuthenticated).toBe(true);
          expect(authState.user?.email).toBe('newuser@example.com');
          expect(authState.token).toBeDefined();
          done();
        },
        error: () => fail('Registration should succeed')
      });
    });

    it('should set current user after registration', (done) => {
      service.register('test@example.com', 'password', 'Test', 'User').subscribe({
        next: () => {
          const currentUser = service.getCurrentUser();
          expect(currentUser?.firstName).toBe('Test');
          expect(currentUser?.lastName).toBe('User');
          done();
        }
      });
    });

    it('should fail when registering existing email', (done) => {
      service.register('john@example.com', 'password123', 'John', 'Doe').subscribe({
        next: () => fail('Registration should fail'),
        error: (error) => {
          expect(error).toBeDefined();
          expect(error.message).toContain('User already exists');
          done();
        }
      });
    });

    it('should not authenticate on failed registration', (done) => {
      service.register('john@example.com', 'password', 'John', 'Doe').subscribe({
        next: () => fail('Registration should fail'),
        error: () => {
          expect(service.isAuthenticated()).toBe(false);
          done();
        }
      });
    });

    it('should generate a token on successful registration', (done) => {
      service.register('unique@example.com', 'password', 'User', 'Name').subscribe({
        next: () => {
          const token = service.getToken();
          expect(token).toBeDefined();
          expect(typeof token).toBe('string');
          done();
        }
      });
    });
  });

  describe('logout', () => {
    it('should clear authentication state', (done) => {
      service.login('john@example.com', 'password123').subscribe({
        next: () => {
          expect(service.isAuthenticated()).toBe(true);

          service.logout();

          expect(service.isAuthenticated()).toBe(false);
          expect(service.getCurrentUser()).toBeNull();
          expect(service.getToken()).toBeNull();
          done();
        }
      });
    });

    it('should emit new state on logout', (done) => {
      service.login('john@example.com', 'password123').subscribe({
        next: () => {
          service.logout();

          service.getAuthState().subscribe(state => {
            expect(state.isAuthenticated).toBe(false);
            done();
          });
        }
      });
    });

    it('should allow login after logout', (done) => {
      service.login('john@example.com', 'password123').subscribe({
        next: () => {
          service.logout();

          service.login('jane@example.com', 'password456').subscribe({
            next: (newAuthState) => {
              expect(newAuthState.user?.email).toBe('jane@example.com');
              done();
            }
          });
        }
      });
    });
  });

  describe('getCurrentAuthState', () => {
    it('should return current auth state synchronously', () => {
      const state = service.getCurrentAuthState();
      expect(state).toBeDefined();
      expect(state.isAuthenticated).toBe(false);
    });

    it('should reflect state after login', (done) => {
      service.login('john@example.com', 'password123').subscribe({
        next: () => {
          const state = service.getCurrentAuthState();
          expect(state.isAuthenticated).toBe(true);
          expect(state.user?.email).toBe('john@example.com');
          done();
        }
      });
    });
  });

  describe('isAuthenticated', () => {
    it('should return false when not authenticated', () => {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should return true after login', (done) => {
      service.login('john@example.com', 'password123').subscribe({
        next: () => {
          expect(service.isAuthenticated()).toBe(true);
          done();
        }
      });
    });

    it('should return false after logout', (done) => {
      service.login('john@example.com', 'password123').subscribe({
        next: () => {
          service.logout();
          expect(service.isAuthenticated()).toBe(false);
          done();
        }
      });
    });
  });

  describe('getToken', () => {
    it('should return null when not authenticated', () => {
      expect(service.getToken()).toBeNull();
    });

    it('should return token after login', (done) => {
      service.login('john@example.com', 'password123').subscribe({
        next: () => {
          const token = service.getToken();
          expect(token).toBeDefined();
          expect(token).not.toBeNull();
          done();
        }
      });
    });

    it('should return null after logout', (done) => {
      service.login('john@example.com', 'password123').subscribe({
        next: () => {
          service.logout();
          expect(service.getToken()).toBeNull();
          done();
        }
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple rapid login attempts', (done) => {
      let loginCount = 0;

      const attemptLogin = () => {
        service.login('john@example.com', 'password123').subscribe({
          next: () => {
            loginCount++;
            if (loginCount === 3) {
              expect(service.isAuthenticated()).toBe(true);
              done();
            }
          }
        });
      };

      attemptLogin();
      attemptLogin();
      attemptLogin();
    });

    it('should handle empty credentials', (done) => {
      service.login('', '').subscribe({
        next: () => fail('Login should fail'),
        error: () => {
          expect(service.isAuthenticated()).toBe(false);
          done();
        }
      });
    });
  });
});
