import { Routes } from '@angular/router';
import { stateDataGuard } from './guards/state-data.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((c) => c.Home),
  },
  {
    path: 'result',
    canActivate: [stateDataGuard],
    loadComponent: () => import('./pages/result/result').then((c) => c.Result),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
