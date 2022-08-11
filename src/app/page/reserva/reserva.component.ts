import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mesas } from 'src/app/domain/mesas';
import { Reserva } from 'src/app/domain/reserva';
import { FacturacionServiceService } from 'src/app/service/factura/facturacion-service.service';
import { ReservaServiceService } from 'src/app/service/reserva/reserva-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent implements OnInit {
  constructor(
    private reservaService: ReservaServiceService,
    private route: ActivatedRoute,
    private facturaServ: FacturacionServiceService
  ) {}

  cedulaCL: string = '';
  cedula: String = '';
  reserva: Reserva = new Reserva();
  estad: boolean = false;

  mesasR: Mesas[] = [];
  mesaN: Mesas = new Mesas();

  cont: number = 15;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cedulaCL = params['cliente'];
      environment.id = this.cedulaCL;
      console.log('ced logy> ', environment.id);
      this.cedulaCL = environment.id;
    });

    this.facturaServ.getFactura().subscribe((data) => {
      data.forEach((a) => {
        console.log(' est ', a.estado);
      })      
    })

    this.reservaService.getReservas().subscribe( (data) => {
      console.log(data);
      
    })
    for (let index = 0; index < 15; index++) {
      if(this.mesaN.estadoLibre == false){
        this.mesaN = new Mesas();
        this.mesaN.id = index+1;
        this.mesasR.push(this.mesaN);
      }
    }
    
    // console.log('mes ', this.mesasR);
    
  }

  mesaReservada(){
    this.cont = 0;
    let idSelec = this.mesasR.filter(a => a.estadoLibre == true);
    this.reserva.numeroMesa = idSelec[0].id;
    this.mesasR = this.mesasR.filter(a => a.estadoLibre == false);

  }

  crearReserva() {
    console.log('esc ', this.reserva.numeroMesa);
    
    if (this.cedulaCL == 'adminLog_AC') {
      let ced: string = window.prompt('Ingrese la cedula del Cliente')!;
      this.reserva.cedula = ced;

      let fechaI: Date = new Date(this.reserva.fechaIngreso);
      fechaI.setDate(fechaI.getDate() + 1);
      this.reserva.fechaIngreso = fechaI;

      let fechaS: Date = new Date(this.reserva.fechaSalida);
      fechaS.setDate(fechaS.getDate() + 1);
      this.reserva.fechaSalida = fechaS;

      console.log('la red > ', this.reserva);
      this.reservaService.crearReserva(this.reserva).subscribe((data) => {
        console.log(' reservado ', data);
      });
    } else {
      this.reserva.cedula = this.cedulaCL;
      console.log('1 ', this.reserva);

      let fechaI: Date = new Date(this.reserva.fechaIngreso);
      fechaI.setDate(fechaI.getDate() + 1);
      this.reserva.fechaIngreso = fechaI;

      let fechaS: Date = new Date(this.reserva.fechaSalida);
      fechaS.setDate(fechaS.getDate() + 1);
      this.reserva.fechaSalida = fechaS;

      console.log('la red  cl> ', this.reserva);

      this.reservaService.crearReserva(this.reserva).subscribe((data) => {
        console.log(' reservado ', data);
      });
    }
  }
}
