import { Injectable } from '@angular/core';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private api: ApiService) {}

  // 🔹 PROVINCIAS
  getProvincias() {
    return this.api.get('provincias');
  }

  // 🔹 CANTONES POR PROVINCIA
  getCantonesByProvincia(provinciaId: string) {
    return this.api.get(`cantones/provincia/${provinciaId}`);
  }

  // 🔹 PARROQUIAS POR CANTON
  getParroquiasByCanton(cantonId: string) {
    return this.api.get(`parroquias/canton/${cantonId}`);
  }

  // 🔹 BARRIOS POR PARROQUIA
  getBarriosByParroquia(parroquiaId: string) {
    return this.api.get(`barrios/parroquia/${parroquiaId}`);
  }

  // 🔹 VISITAS
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