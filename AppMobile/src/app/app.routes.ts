import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '**',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
  },



];
