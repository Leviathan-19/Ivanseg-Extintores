import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-main-visita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './main-visita.html',
})
export class MainVisita implements OnInit {
  form: FormGroup;

  provincias: any[] = [];
  cantones: any[] = [];
  parroquias: any[] = [];
  barrios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {
    this.form = this.fb.group({
      provinciaId: [''],
      cantonId: [''],
      parroquiaId: [''],
      barrioId: [''],
    });
  }

  ngOnInit() {
    this.cargarProvincias();
  }

  cargarProvincias() {
    this.api.getProvincias().subscribe((data) => {
      this.provincias = data;
    });
  }

  onProvinciaChange() {
    const provinciaId = this.form.get('provincia')?.value;

    this.api.getCantones(provinciaId).subscribe((data) => {
      this.cantones = data;
      this.parroquias = [];
      this.barrios = [];
    });
  }

  onCantonChange() {
    const cantonId = this.form.get('canton')?.value;

    this.api.getParroquias(cantonId).subscribe((data) => {
      this.parroquias = data;
      this.barrios = [];
    });
  }

  onParroquiaChange() {
    const parroquiaId = this.form.get('parroquia')?.value;

    this.api.getBarrios(parroquiaId).subscribe((data) => {
      this.barrios = data;
    });
  }

  crearVisita() {
    if (this.form.invalid) return;

    this.api.crearVisita(this.form.value).subscribe((response) => {
      console.log('Visita creada:', response);
      alert('Visita creada correctamente');
      this.form.reset();
    });
  }
}
