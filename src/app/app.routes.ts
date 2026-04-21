import { Routes } from '@angular/router';
import { movieResolver } from './features/resolvers/movie-details.resolver';
import { personDetailResolver } from './features/resolvers/person-details.resolver';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/pages/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./features/pages/auth-callback/auth-callback.component').then(
        (m) => m.AuthCallbackComponent,
      ),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'wishlist',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/wishlist-page/wishlist-page.component').then(
        (m) => m.WishlistPageComponent,
      ),
  },
  {
    path: 'favourites',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/favourites-page/favourites-page.component').then(
        (m) => m.FavouritesPageComponent,
      ),
  },
  {
    path: 'details/person/:id',
    canActivate: [authGuard],
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
    canActivate: [authGuard],
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
    canActivate: [authGuard],
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
    canActivate: [authGuard],
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
