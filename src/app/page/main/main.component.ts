import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Cliente } from 'src/app/domain/cliente';
import { ClienteServiceService } from 'src/app/service/cliente-service/cliente-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private router: Router,
    private clienteService: ClienteServiceService
  ) {}

  cliente: Cliente = new Cliente();
  confirmar: boolean = false;

  ngOnInit(): void {
    console.log(this.cliente.email, ' -- ', this.cliente.contrasenia);
  }

  login() {
    console.log('boton');
    console.log(this.cliente);

    if (
      this.cliente.email == 'admin123' &&
      this.cliente.contrasenia == 'qwerty'
    ) {
      console.log('yeaa');
      let params: NavigationExtras = {
        queryParams: {
          cliente: 'adminLog_AC',
        },
      };
      console.log('pa ', params);

      this.router.navigate(['/crear-cliente'], params);
    } else {
      this.clienteService.login(this.cliente).subscribe((data) => {
        console.log("loguead ", data);     
        this.cliente = data;  

        if(data != null){
          let params: NavigationExtras = {
            queryParams: {
              cliente: this.cliente.cedula,
            },
          };
          console.log('pa ', params);
          environment.id = this.cliente.cedula.toString();
          console.log('env main',environment.id);
          
          this.router.navigate(['/reservas'], params);
        }

      });
    }
  }
}
