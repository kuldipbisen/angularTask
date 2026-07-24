import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Return an Observable that emits a boolean
  return authService.getAuthState().pipe(
    map(authState => {
      if (authState.isAuthenticated) {
        return true;
      }

      // Redirect to login if not authenticated
      router.navigate(['/login']);
      return false;
    })
  );
};
