import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideTanStackQuery, QueryClient, withDevtools} from '@tanstack/angular-query-experimental';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideTanStackQuery(
      new QueryClient(),
      withDevtools()
    ),
    provideHttpClient(),
  ]
};
