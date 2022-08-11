import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FacturacionServiceService } from 'src/app/service/factura/facturacion-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.component.html',
  styleUrls: ['./ganancias.component.scss'],
})
export class GananciasComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private facturaServ: FacturacionServiceService,
    private router: Router
  ) {}

  cedulaCL: string = '';
  ganancias: number = 0;
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

      this.router.navigate(['/reservas'], params);
    }

    this.facturaServ.getFactura().subscribe((data) => {
      data.forEach((a) => {
        this.ganancias = this.ganancias + a.total;
        console.log('mis gana', this.ganancias);
      });
    });
  }
}
