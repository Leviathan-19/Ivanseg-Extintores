import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProvincias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/provincias`);
  }

  getCantones(provinciaId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/cantones?provinciaId=${provinciaId}`);
  }

  getParroquias(cantonId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/parroquias?cantonId=${cantonId}`);
  }
  getBarrios(parroquiaId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/barrios?parroquiaId=${parroquiaId}`);
  }

  crearVisita(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/visitas`, data);
  }
}
