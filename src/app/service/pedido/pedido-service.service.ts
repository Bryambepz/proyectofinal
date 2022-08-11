import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/domain/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoServiceService {
  constructor(private http: HttpClient) {}

  pedidoURL = 'http://localhost:8080/ProyectoFinalP60';

  getPedidos(): Observable<Pedido[]> {
    this.pedidoURL = this.pedidoURL + '/apirest/restaurante/pedidos';
    return this.http.get<Pedido[]>(this.pedidoURL);
  }

  crearPedido(pedido: Pedido) {
    this.pedidoURL ='http://localhost:8080/ProyectoFinalP60/apirest/restaurante/pedidosC?id=' +
      pedido.id +
      '&precio=' +
      pedido.precio +
      '&descripcion=' +
      pedido.descripcion +
      '&cedula='+pedido.cedula;
      console.log('path ped ', this.pedidoURL);
      console.log('ped g', pedido);
      
      return this.http.post<Pedido>(this.pedidoURL, pedido);
  }

  getPedidosCliente(){}
}
