import { Routes } from '@angular/router';
export const routes: Routes = [

  {
    path: 'visitas',
    loadChildren: () =>
      import('./modules/visitas/visitas-module')
        .then(m => m.VisitasModule)
  },

  {
    path: '',
    redirectTo: 'visitas',
    pathMatch: 'full'
  }

];