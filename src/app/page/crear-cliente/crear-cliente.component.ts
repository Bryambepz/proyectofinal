import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/domain/cliente';
import { ClienteServiceService } from 'src/app/service/cliente-service/cliente-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss'],
})
export class CrearClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();
  cedulaCL: string = '';

  constructor(
    private clienteService: ClienteServiceService,
    // private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cedulaCL = params['cliente']; 
      environment.id = this.cedulaCL;
      console.log('ced logy> ', environment.id);
      this.cedulaCL = environment.id;
    });
  }

  guardar() {
    console.log(this.cliente);
    if (
      this.cliente.cedula != null ||
      this.cliente.nombre != null ||
      this.cliente.apellido != null ||
      this.cliente.direccion != null ||
      this.cliente.email != null ||
      this.cliente.contrasenia != null
    ) {
      console.log('guardado >', this.cliente);
      this.cliente.id = 2;
      this.clienteService
        .guardarCliente(this.cliente)
        .subscribe((data) => console.log('la ', data));
    }
  }
}
