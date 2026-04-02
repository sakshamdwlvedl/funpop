import { Routes } from '@angular/router';
import { movieResolver } from './features/resolvers/movie-details.resolver';
import { personDetailResolver } from './features/resolvers/person-details.resolver';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'details/person/:id',
    loadComponent: () =>
      import('./features/pages/person-detail-page/person-detail-page.component').then(
        (m) => m.PersonDetailPageComponent,
      ),
    resolve: {
      details: personDetailResolver,
    },
  },
  {
    path: 'details/:type/:id',
    loadComponent: () =>
      import('./features/pages/detail-page/detail-page.component').then(
        (m) => m.DetailPageComponent,
      ),
    resolve: {
      details: movieResolver,
    },
  },
  {
    path: 'details/:type/:id/media-gallery',
    loadComponent: () =>
      import('./features/pages/media-gallery/media-gallery.component').then(
        (m) => m.MediaGalleryComponent,
      ),
    resolve: {
      details: movieResolver,
    },
  },
  {
    path: 'explore',
    loadComponent: () =>
      import('./features/pages/explore/explore.component').then(
        (m) => m.ExploreComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
