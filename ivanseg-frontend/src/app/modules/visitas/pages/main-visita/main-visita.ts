import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UbicacionService } from '../../../../core/services/ubicacion';

@Component({
  selector: 'app-main-visita',
  templateUrl: './main-visita.html',
  styleUrls: ['./main-visita.css']
})
export class MainVisita implements OnInit {

  form!: FormGroup;

  provincias: any[] = [];
  cantones: any[] = [];
  parroquias: any[] = [];
  barrios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      provinciaId: [''],
      cantonId: [''],
      parroquiaId: [''],
      barrioId: ['']
    });

    this.cargarProvincias();
  }

  cargarProvincias() {
    this.ubicacionService.getProvincias()
      .subscribe((data: any) => {
        this.provincias = data;
      });
  }

  onProvinciaChange() {
    const provinciaId = this.form.value.provinciaId;
    this.ubicacionService.getCantonesByProvincia(provinciaId)
      .subscribe((data: any) => {
        this.cantones = data;
        this.parroquias = [];
        this.barrios = [];
      });
  }

  onCantonChange() {
    const cantonId = this.form.value.cantonId;
    this.ubicacionService.getParroquiasByCanton(cantonId)
      .subscribe((data: any) => {
        this.parroquias = data;
        this.barrios = [];
      });
  }

  onParroquiaChange() {
    const parroquiaId = this.form.value.parroquiaId;
    this.ubicacionService.getBarriosByParroquia(parroquiaId)
      .subscribe((data: any) => {
        this.barrios = data;
      });
  }

  crearVisita() {
    const data = {
      barrioId: this.form.value.barrioId
    };

    this.ubicacionService.crearVisita(data)
      .subscribe(() => {
        alert('Visita creada correctamente');
      });
  }
}
