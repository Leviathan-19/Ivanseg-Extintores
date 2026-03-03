import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'visitas',
    loadComponent: () =>
      import('./modules/visitas/pages/main-visita/main-visita')
        .then(m => m.MainVisita)
  }
];