import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LOCAL_STORAGE } from '@app/core/tokens';

/**
 * HTTP Interceptor for adding authentication token to all requests
 * Automatically injects the Bearer token from localStorage to Authorization header
 * if a token is present. Excludes login endpoint.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LOCAL_STORAGE) as Storage;
  
  // Get auth token from localStorage
  const token = localStorage.getItem('authToken');
  
  // Skip adding token to login request (no auth needed yet)
  if (req.url.includes('/auth/login')) {
    return next(req);
  }
  
  // If token exists, clone the request and add Authorization header
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return next(authReq);
  }
  
  // If no token, proceed with original request
  return next(req);
};
