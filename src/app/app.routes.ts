import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'fighters', pathMatch: 'full' },
  {
    path: 'fighters',
    loadComponent: () =>
      import('./features/fighter-list/fighter-list.component').then(
        (m) => m.FighterListComponent
      ),
  },
  {
    path: 'fighters/:id',
    loadComponent: () =>
      import('./features/fighter-detail/fighter-detail.component').then(
        (m) => m.FighterDetailComponent
      ),
  },
  { path: '**', redirectTo: 'fighters' },
];
