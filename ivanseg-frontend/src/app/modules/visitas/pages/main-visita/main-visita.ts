import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../../core/services/api.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-main-visita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './main-visita.html',
  styleUrls: ['./main-visita.css']
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

      barrioId: ['', Validators.required],

      razonSocial: ['', [Validators.required, Validators.minLength(2)]],
      nombreCliente: [''],

      telefono: [''],
      correo: ['', Validators.email],

      callePrincipal: ['', Validators.required],
      calleSecundaria: [''],
      numeracion: [''],

      latitud: [null],
      longitud: [null],

      estadoVisita: [''],
      proximaVisita: ['', Validators.required],
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
  cargandoUbicacion = false;
  obtenerUbicacion() {
    this.cargandoUbicacion = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.form.patchValue({
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
        });

        this.cargandoUbicacion = false;
      },
      (error) => {
        console.error(error);
        this.cargandoUbicacion = false;
      },
    );
  }
  crearVisita() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    const toNull = (valor: any) => (valor === '' || valor === undefined ? null : valor);

    const payload = {
      barrioId: formValue.barrioId,
      razonSocial: formValue.razonSocial,
      callePrincipal: formValue.callePrincipal,
      proximaVisita: formValue.proximaVisita,

      nombreCliente: toNull(formValue.nombreCliente),
      telefono: toNull(formValue.telefono),
      correo: toNull(formValue.correo),
      calleSecundaria: toNull(formValue.calleSecundaria),
      numeracion: toNull(formValue.numeracion),
      estadoVisita: toNull(formValue.estadoVisita),

      latitud: formValue.latitud ?? null,
      longitud: formValue.longitud ?? null,
    };

    console.log('PAYLOAD FINAL:', payload);

    this.api.crearVisita(payload).subscribe({
      next: () => {
        alert('Visita creada correctamente');
        this.form.reset();
      },
      error: (error) => {
        console.error('Error backend:', error.error);
      },
    });
  }
}
