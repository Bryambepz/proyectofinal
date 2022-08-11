import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  ced: string = '';
  cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  clientes: Cliente[] = [];

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.cedulaCL = params['cliente']; 
      environment.id = this.cedulaCL;
      console.log('ced logy> ', environment.id);
      this.cedulaCL = environment.id;
    });
    
    
    console.log('log > ', environment.id);

    if(this.cedulaCL != 'adminLog_AC'){
      console.log('bye ', this.cedulaCL);
      

      let params: NavigationExtras = {
        queryParams: {
          cliente: this.cedulaCL,
        },
      };

      console.log('logc v', environment.id);
      console.log('passs ', params);
      this.router.navigate(['/reservas'], params);
    }
  }

  buscar() {
    console.log('la ced > ', this.cliente.cedula);
    this.clienteService.getClienteCedula(this.cliente).subscribe((data) => {
      console.log('cl bus > ', data);
      this.clientes = [];
      this.clientes.unshift(data);
      console.log('n cl >', this.clientes);
    });
  }

  Cancelar() {
    this.clienteService.getCliente().subscribe((data) => {
      console.log('los cli > ', data);
      this.clientes = data;
    });
  }

  membresia(cedula: string, membresia: boolean) {
    console.log('cambiado', cedula);
    this.cliente.cedula = cedula;
    this.cliente.membresia = membresia;
    console.log('el > ', this.cliente);

    this.clienteService.actualizar(this.cliente).subscribe((data) => {
      console.log('new > ', data);
    });
  }
}
