import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './visitas-routing-module';
import { MainVisita } from './pages/main-visita/main-visita';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MainVisita,              // 👈 AQUÍ
    RouterModule.forChild(routes)
  ]
})
export class VisitasModule { }