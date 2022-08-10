import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/domain/cliente';
import { ClienteServiceService } from 'src/app/service/cliente-service/cliente-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.scss'],
})
export class ListarClienteComponent implements OnInit {
  cedulaCL: string = '';

  cliente: Cliente = new Cliente();
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cedulaCL = params['cliente']; 
      environment.id = this.cedulaCL;
      console.log('ced logy> ', environment.id);
      this.cedulaCL = environment.id;
    });

    this.clienteService.getCliente().subscribe((data) => {
      console.log('los cli > ', data);
      this.clientes = data;
    })
  }

  buscar(){

  }
}
