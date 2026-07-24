import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '@environments/environment';
import { ENVIRONMENT, API_URL, LOCAL_STORAGE } from './core/tokens';
import { authInterceptor } from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: LOCAL_STORAGE,
      useValue: window.localStorage,
    },
    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
  ]
};
