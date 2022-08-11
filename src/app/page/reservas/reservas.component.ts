import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from 'src/app/domain/reserva';
import { ReservaServiceService } from 'src/app/service/reserva/reserva-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {
  constructor(
    private reservaService: ReservaServiceService,
    private route: ActivatedRoute
  ) {}
  cedulaCL: string = '';  
  reservas: Reserva[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cedulaCL = params['cliente'];
      environment.id = this.cedulaCL;
      console.log('ced logy> ', environment.id);
      this.cedulaCL = environment.id;
    });

    console.log('log ', environment.id);
    
    this.reservaService.getReservas().subscribe((data) => {
      console.log('las res',data);
      this.reservas = data;
      console.log(this.reservas);
      
    })
  }


}
