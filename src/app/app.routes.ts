import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((c) => c.Home),
  },
  {
    path: 'result',
    loadComponent: () => import('./pages/result/result').then((c) => c.Result),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
