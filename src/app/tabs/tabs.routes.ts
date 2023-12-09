import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {authGuard} from "../guards/auth.guard";

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [authGuard],
    children: [
      {
        path: 'tab1',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab1/crear-viaje',
        loadComponent: () =>
          import('../tab1/crear-viaje/crear-viaje.component').then((m) => m.CrearViajeComponent),
      },
      {
        path: 'tab1/crear-vehiculo',
        loadComponent: () =>
          import('../tab1/crear-vehiculo/crear-vehiculo.component').then((m) => m.CrearVehiculoComponent),
      },
      {
        path: 'tab1/ver-vehiculos',
        loadComponent: () =>
          import('../tab1/ver-vehiculos/ver-vehiculos.page').then((m) => m.VerVehiculosPage),
      },
      {
        path: 'tab1/ver-viajes',
        loadComponent: () =>
          import('../tab1/ver-viajes/ver-viajes.page').then((m) => m.VerViajesPage),
      },
      {
        path: 'tab1/informacion-viaje',
        loadComponent: () =>
          import('../tab1/informacion-viaje/informacion-viaje.page').then((m) => m.InformacionViajePage),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
