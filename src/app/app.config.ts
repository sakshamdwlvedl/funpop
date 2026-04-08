import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tmdbInterceptor } from './core/interceptors/tmdb.interceptor';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { environment } from '../environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),
    provideHttpClient(withInterceptors([tmdbInterceptor])),
    provideAnimationsAsync(),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        const width = config.width ?? 342;

        let tmdbWidth = 'w342';

        if (width <= 92) tmdbWidth = 'w92';
        else if (width <= 154) tmdbWidth = 'w154';
        else if (width <= 185) tmdbWidth = 'w185';
        else if (width <= 342) tmdbWidth = 'w342';
        else if (width <= 500) tmdbWidth = 'w500';
        else if (width <= 780) tmdbWidth = 'w780';
        else if (width <= 1280) tmdbWidth = 'w1280';
        else if (width <= 1920) tmdbWidth = 'w1920';
        else tmdbWidth = 'original';

        return `${environment.TMDB_IMG_BASE}/${tmdbWidth}${config.src}`;
      },
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
  ],
};
