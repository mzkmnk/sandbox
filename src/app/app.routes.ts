import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'tan-stack',
    loadComponent:() => import('./pages/tan-stack.component').then((M) => M.TarnStackComponent),
  },
  {
    path:'**',
    redirectTo: 'tan-stack',
  }
];
