import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProvincias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/provincias`);
  }

  getCantones(provinciaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cantones/${provinciaId}`);
  }

  getParroquias(cantonId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/parroquias/${cantonId}`);
  }

  getBarrios(parroquiaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/barrios/${parroquiaId}`);
  }

  crearVisita(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/visitas`, data);
  }
}