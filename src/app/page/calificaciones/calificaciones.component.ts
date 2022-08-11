import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calificacion } from 'src/app/domain/calificacion';
import { CalificacionServiceService } from 'src/app/service/calificacion/calificacion-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss'],
})
export class CalificacionesComponent implements OnInit {
  constructor(
    private calificacionServ: CalificacionServiceService,
    private route: ActivatedRoute
  ) {}

  cedulaCL: string = '';

  calificacion: Calificacion = new Calificacion();
  calificacion2: Calificacion = new Calificacion();
  calificacion3: Calificacion = new Calificacion();
  calificacion4: Calificacion = new Calificacion();
  calificacion5: Calificacion = new Calificacion();

  calsOb: number[] = [];
  cliOb: string[] = [];

  calificaciones: Calificacion[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cedulaCL = params['cliente'];
      environment.id = this.cedulaCL;
      console.log('ced logy> ', environment.id);
      this.cedulaCL = environment.id;
    });

    this.calificaciones.push(this.calificacion);
    this.calificaciones.push(this.calificacion2);
    this.calificaciones.push(this.calificacion3);
    this.calificaciones.push(this.calificacion4);
    this.calificaciones.push(this.calificacion5);

    this.calificacionServ.getNotacli().subscribe((data) => {
      this.calsOb = data;
    })

    this.calificacionServ.getClientesCal().subscribe((data) => {
      this.cliOb = data
    })
    
  }

  calificar() {
    let c = 1;
    console.log('cal p', this.calificaciones);
    this.calificaciones.forEach((a) => {
      if (a.marca == true) {
        if (this.cedulaCL == 'adminLog_AC') {
          let ced: string = window.prompt('Ingrese la cedula del Cliente')!;
          this.calificacion.cedula = ced;

          this.calificacion.valor = c;

          console.log('la cl ', this.calificacion);
          this.calificacionServ.crearCalificacion(this.calificacion).subscribe((data) => {
            console.log('lac cal ', data);
            
          })
          
        }else{
          this.calificacion.cedula = this.cedulaCL;

          this.calificacion.valor = c;

          console.log('la cl ', this.calificacion);
          this.calificacionServ.crearCalificacion(this.calificacion).subscribe((data) => {
            console.log('lac cal ', data);
            
          })
        }
      }
      c = c + 1;
    });
  }
}
