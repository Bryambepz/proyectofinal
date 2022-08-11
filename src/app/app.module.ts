import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './page/main/main.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { CrearClienteComponent } from './page/crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './page/listar-cliente/listar-cliente.component';
import { ReservaComponent } from './page/reserva/reserva.component';
import { ReservasComponent } from './page/reservas/reservas.component';
import { FacturaComponent } from './page/factura/factura.component';
import { GananciasComponent } from './page/ganancias/ganancias.component';
import { CalificacionesComponent } from './page/calificaciones/calificaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CrearClienteComponent,
    ListarClienteComponent,
    ReservaComponent,
    ReservasComponent,
    FacturaComponent,
    GananciasComponent,
    CalificacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
