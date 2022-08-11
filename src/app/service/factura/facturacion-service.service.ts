import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaCabecera } from 'src/app/domain/facturaCab';
import { FacturaDetalle } from 'src/app/domain/facturaDet';

@Injectable({
  providedIn: 'root',
})
export class FacturacionServiceService {
  constructor(private http: HttpClient) {}
  facturaURL = 'http://localhost:8080/ProyectoFinalP60';

  getDetalle(): Observable<FacturaDetalle[]> {
    this.facturaURL =
      this.facturaURL + '/apirest/restaurante/facturasDetale';
    return this.http.get<FacturaDetalle[]>(this.facturaURL);
  }

  getFactura():Observable<FacturaCabecera[]>{
    return this.http.get<FacturaCabecera[]>(' http://localhost:8080/ProyectoFinalP60/apirest/restaurante/facturasCabeceras');
  }
  
  crearFacturaDetalle(facDet: FacturaDetalle) {
    this.facturaURL =
      'http://localhost:8080/ProyectoFinalP60/apirest/restaurante/facturaDet_C?codigo=' +
      facDet.id +
      '&cantidad=' +
      facDet.cantidad +
      '&precioU=' +
      facDet.precioU +
      '&precioT=' +
      facDet.precioT +
      '&pedido=' +
      facDet.pedido_id +
      '&cabecera=' +
      facDet.cabId +
      '&descripcion=' +
      facDet.descripcion;
    console.log('facD path ', this.facturaURL);
    return this.http.post<FacturaDetalle>(this.facturaURL, facDet);
  }

  crearFactura(facCab: FacturaCabecera) {
    this.facturaURL =
      'http://localhost:8080/ProyectoFinalP60/apirest/restaurante/facturaCab_C?codigo=' +
      facCab.codigo +
      '&fecha=' +
      facCab.fecha +
      '&estado=' +
      facCab.estado +
      '&total='+facCab.total+
      '&cedula='+facCab.cedula;
    console.log('facD path ', this.facturaURL);
    return this.http.post<FacturaCabecera>(this.facturaURL, facCab);
  }
}
