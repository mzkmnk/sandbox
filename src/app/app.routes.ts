import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'tan-stack',
    loadComponent:() => import('./pages/tan-stack.component').then((M) => M.TarnStackComponent),
  },
  {
    path:'linked-signal',
    loadComponent:() => import('./pages/linked-signal.component').then((M) => M.LinkedSignalComponent),
  },
  {
    path:'**',
    redirectTo: 'tan-stack',
  }
];
