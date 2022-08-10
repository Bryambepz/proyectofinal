import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/domain/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteServiceService {
  private clienteURL: string = '';
  constructor(private http: HttpClient) {}

  login(cliente: Cliente) {
    console.log("log > ", cliente.email);
    
    this.clienteURL =
      'http://localhost:8080/ProyectoFinalP60/apirest/restaurante/login';
    return this.http.post<Cliente>(
      this.clienteURL +
        '?correo=' +
        cliente.email +
        '&contrasenia=' +
        cliente.contrasenia,
      cliente
    );
  }

  guardarCliente(cliente: Cliente) {
    console.log('el us > ', cliente);

    this.clienteURL ='http://localhost:8080/ProyectoFinalP60/apirest/restaurante/clienteC?cedula=' +
      cliente.cedula +
      '&nombre=' +
      cliente.nombre +
      '&apellido=' +
      cliente.apellido +
      '&direccion=' +
      cliente.direccion +
      '&email=' +
      cliente.email +
      '&contrasenia=' +
      cliente.contrasenia +
      '&membresia=' +
      cliente.membresia;
    return this.http.post<Cliente>(this.clienteURL, cliente);
  }

  getCliente(): Observable<Cliente>{
    this.clienteURL = 'http://localhost:8080/ProyectoFinalP60/apirest/restaurante/clientes';
    return this.http.get<Cliente>(this.clienteURL);
  }
}
