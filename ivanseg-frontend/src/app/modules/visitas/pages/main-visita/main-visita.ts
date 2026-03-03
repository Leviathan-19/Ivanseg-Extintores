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
    this.api.getProvincias().subscribe((data) => {
      this.provincias = data;
    });

    this.form.get('provinciaId')?.valueChanges.subscribe((provinciaId) => {
      if (!provinciaId) return;

      this.api.getCantones(provinciaId).subscribe((data) => {
        this.cantones = data;
        this.parroquias = [];
        this.barrios = [];

        this.form.patchValue({
          cantonId: '',
          parroquiaId: '',
          barrioId: '',
        });
      });
    });

    this.form.get('cantonId')?.valueChanges.subscribe((cantonId) => {
      console.log('Canton ID:', cantonId);

      if (!cantonId) return;

      this.api.getParroquias(cantonId).subscribe((data) => {
        console.log('Parroquias recibidas:', data);

        this.parroquias = data;

        this.barrios = [];

        this.form.patchValue({
          parroquiaId: '',
          barrioId: '',
        });
      });
    });

    this.form.get('parroquiaId')?.valueChanges.subscribe((parroquiaId) => {
      if (!parroquiaId) return;

      this.api.getBarrios(parroquiaId).subscribe((data) => {
        this.barrios = data;
      });
    });
  }
  crearVisita() {
    console.log("FORM VALUE:", this.form.value);
    if (this.form.invalid) return;

    this.api.crearVisita(this.form.value).subscribe((response) => {
      console.log('Visita creada:', response);
      alert('Visita creada correctamente');
      this.form.reset();
    },
    (error) => {
      console.error('Error al crear visita:', error);
      alert('Error al crear visita');
    });
  }
}
