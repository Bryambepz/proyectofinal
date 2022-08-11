import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FacturaCabecera } from 'src/app/domain/facturaCab';
import { FacturaDetalle } from 'src/app/domain/facturaDet';
import { Pedido } from 'src/app/domain/pedido';
import { FacturacionServiceService } from 'src/app/service/factura/facturacion-service.service';
import { PedidoServiceService } from 'src/app/service/pedido/pedido-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public pedidoServ: PedidoServiceService,
    private facturaSev: FacturacionServiceService
  ) {}

  cedulaCL: string = '';
  facturaCab: FacturaCabecera = new FacturaCabecera();
  facturaDet: FacturaDetalle = new FacturaDetalle();
  pedido: Pedido = new Pedido();

  pedidos: Pedido[] = [];
  pedidosReg: Pedido[] = [];
  facturasDet: FacturaDetalle[] = [];

  precioT: number = 0;

  facturaT: number = 0;

  idPedido: number = 0;
  idDet: number = 0;

  fecha: Date = new Date();

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cedulaCL = params['cliente'];
      environment.id = this.cedulaCL;
      console.log('ced logy> ', environment.id);
      this.cedulaCL = environment.id;
    });

    console.log('log > ', environment.id);

    if (this.cedulaCL != 'adminLog_AC') {
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

    this.facturaSev.getDetalle().subscribe((data) => {
      console.log('d ', data);

      if (data.length == 0) {
        this.idDet = 0;
      } else {
        this.idDet = data.length;
      }
      console.log('los det ', this.idDet);
    });

    this.pedidoServ.getPedidos().subscribe((data) => {
      console.log('p ', data);

      if (data.length == 0) {
        this.idPedido = 0;
      } else {
        this.idPedido = data.length;
      }
      console.log('los pedidos ', this.idPedido);
    });
  }

  guardar() {
    if (this.cedulaCL == 'adminLog_AC') {
      let ced: string = window.prompt('Ingrese la cedula del Cliente')!;
      this.facturaCab.cedula = ced;
      this.facturaSev.crearFactura(this.facturaCab).subscribe((data) => {
        console.log('cab g ', data);
      });
    }else{
      this.facturaCab.cedula = this.cedulaCL;
      this.facturaSev.crearFactura(this.facturaCab).subscribe((data) => {
        console.log('cab g ', data);
      });
    }
  }

  crearPedido() {
    if (this.cedulaCL == 'adminLog_AC') {
      let ced: string = window.prompt('Ingrese la cedula del Cliente')!;
      this.pedido.cedula = ced;

      this.idPedido = this.idPedido + 1;
      this.pedido.id = this.idPedido;

      this.pedidoServ.crearPedido(this.pedido).subscribe((data) => {
        console.log('pedido g ', data);
      });
    } else {
      this.idPedido = this.idPedido + 1;
      this.pedido.id = this.idPedido;
      this.pedido.cedula = this.cedulaCL;

      this.pedidoServ.crearPedido(this.pedido).subscribe((data) => {
        console.log('pedido g ', data);
      });
    }

    this.fecha = new Date(this.facturaCab.fecha);
    this.fecha.setDate(this.fecha.getDate() + 1);
    this.facturaCab.fecha = this.fecha;

    console.log('fac ', this.facturaCab);
    this.facturaSev.crearFactura(this.facturaCab).subscribe((data) => {
      console.log('cab g ', data);
    });

    this.pedidosReg.push(this.pedido);
    this.pedidos = [];
    this.pedidos.push(this.pedido);
    // this.pedido = new Pedido();
  }

  calcular(precioU: number) {
    this.idDet = this.idDet + 1;
    this.precioT = this.facturaDet.cantidad * precioU;
    this.facturaDet.id = this.idDet;
    this.facturaDet.precioT = this.precioT;
    this.facturaDet.descripcion = this.pedido.descripcion;
    this.facturaDet.precioU = this.pedido.precio;

    this.facturaDet.cabId = this.facturaCab.codigo;
    this.facturaDet.pedido_id = this.pedido.id;

    console.log('det ', this.facturaDet);
    console.log('fac ', this.facturaCab);

    this.facturaSev.crearFacturaDetalle(this.facturaDet).subscribe((data) => {
      console.log('det g ', data);
    });

    this.facturasDet.push(this.facturaDet);

    this.facturaDet = new FacturaDetalle();
    this.pedidos = [];
  }

  calcularT() {
    this.facturasDet.forEach(
      (a) => (this.facturaT = this.facturaT + a.precioT)
    );
    console.log('fac vla ', this.facturaT);
    this.facturaCab.total = this.facturaT;
  }
}
