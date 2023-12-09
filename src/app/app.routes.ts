import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: '**',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
  },
  {
    path: 'ver-viajes',
    loadComponent: () => import('./tab1/ver-viajes/ver-viajes.page').then( m => m.VerViajesPage)
  },
  {
    path: 'informacion-viaje',
    loadComponent: () => import('./tab1/informacion-viaje/informacion-viaje.page').then(m => m.InformacionViajePage)
  },

];
