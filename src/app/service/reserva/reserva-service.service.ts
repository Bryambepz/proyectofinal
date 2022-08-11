import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from 'src/app/domain/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaServiceService {

  constructor(private http: HttpClient) {}
  private reservaPath: string =
    'http://localhost:8080/ProyectoFinalP60/apirest';

  crearReserva(reserva: Reserva) {
    this.reservaPath = 'http://localhost:8080/ProyectoFinalP60/apirest/restaurante/reservaC?fechaIngreso=' +
      reserva.fechaIngreso +
      '&fechasalida=' +
      reserva.fechaSalida +
      '&numPersonas=' +
      reserva.numeroPersona +
      '&numMesa=' +
      reserva.numeroMesa + 
      '&cliente='+reserva.cedula;

      console.log('el path > ', this.reservaPath);
      
      return this.http.post<Reserva>(this.reservaPath, reserva);
  }

  getReservas(){
    this.reservaPath = this.reservaPath+'/restaurante/reservas'
    return this.http.get<Reserva[]>(this.reservaPath);
  }
}
