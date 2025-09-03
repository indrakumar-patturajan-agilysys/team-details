import { Routes } from '@angular/router';

export const participantRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./participant-list/participant-list').then(c => c.ParticipantList)
  },
  {
    path: 'create',
    loadComponent: () => import('./create-update-participant-detail/create-update-participant-detail').then(c => c.CreateUpdateParticipantDetail)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./create-update-participant-detail/create-update-participant-detail').then(c => c.CreateUpdateParticipantDetail)
  }
];
