import { Routes } from '@angular/router';
import { DetailPageComponent } from './features/pages/detail-page/detail-page.component';
import { movieResolver } from './features/resolvers/movie-details.resolver';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'details/:type/:id',
    component: DetailPageComponent,
    resolve: {
      details: movieResolver,
    },
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
