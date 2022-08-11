import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calificacion } from 'src/app/domain/calificacion';

@Injectable({
  providedIn: 'root',
})
export class CalificacionServiceService {
  constructor(private http: HttpClient) {}
  calURL: string = '';

  getCalificaciones(): Observable<Calificacion[]>{
    return this.http.get<Calificacion[]>(
      'http://localhost:8080/ProyectoFinalP60/apirest/restaurante/listarCalificaciones'
    );
  }

  crearCalificacion(cali: Calificacion) {
    this.calURL =
      'http://localhost:8080/ProyectoFinalP60/apirest/restaurante/crearNotaCalificaciones?calificacion=' +
      cali.valor +
      '&cedula=' +
      cali.cedula;

      return this.http.post<Calificacion>(this.calURL, cali);
  }

  getClientesCal(): Observable<string[]>{
    return this.http.get<string[]>('http://localhost:8080/ProyectoFinalP60/apirest/restaurante/calificacionesClientes');
  }

  getNotacli():Observable<number[]>{
    return this.http.get<number[]>('http://localhost:8080/ProyectoFinalP60/apirest/restaurante/calificacionesClientesNota');
  }
}
