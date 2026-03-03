import { Injectable } from '@angular/core';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private api: ApiService) {}

  getProvincias() {
    return this.api.get('provincias');
  }

  getCantonesByProvincia(provinciaId: string) {
    return this.api.get(`cantones/provincia/${provinciaId}`);
  }

  getParroquiasByCanton(cantonId: string) {
    return this.api.get(`parroquias/canton/${cantonId}`);
  }

  getBarriosByParroquia(parroquiaId: string) {
    return this.api.get(`barrios/parroquia/${parroquiaId}`);
  }

  crearVisita(data: any) {
    return this.api.post('visitas', data);
  }

  getVisitas() {
    return this.api.get('visitas');
  }

  getVisitaById(id: string) {
    return this.api.get(`visitas/${id}`);
  }

  updateVisita(id: string, data: any) {
    return this.api.put(`visitas/${id}`, data);
  }

  deleteVisita(id: string) {
    return this.api.delete(`visitas/${id}`);
  }
}