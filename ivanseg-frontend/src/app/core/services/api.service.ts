import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://ivanseg-extintores.onrender.com/';

  constructor(private http: HttpClient) {}

  getProvincias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/provincias`);
  }

  getCantones(provinciaId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/cantones?provinciaId=${provinciaId}`
    );
  }

  getParroquias(cantonId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/parroquias?cantonId=${cantonId}`
    );
  }

  getBarrios(parroquiaId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/barrios?parroquiaId=${parroquiaId}`
    );
  }

  crearVisita(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/visitas`, data);
  }
}