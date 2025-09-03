import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(c => c.DashboardComponent)
  },
  {
    path: 'participants',
    loadChildren: () => import('./features/participant/participant.routes').then(r => r.participantRoutes)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
