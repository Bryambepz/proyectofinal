import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalificacionesComponent } from './page/calificaciones/calificaciones.component';
import { CrearClienteComponent } from './page/crear-cliente/crear-cliente.component';
import { FacturaComponent } from './page/factura/factura.component';
import { GananciasComponent } from './page/ganancias/ganancias.component';
import { ListarClienteComponent } from './page/listar-cliente/listar-cliente.component';
import { MainComponent } from './page/main/main.component';
import { ReservaComponent } from './page/reserva/reserva.component';
import { ReservasComponent } from './page/reservas/reservas.component';

const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'crear-cliente', component: CrearClienteComponent},
  { path: 'listar-cliente', component: ListarClienteComponent},
  { path: 'reserva', component: ReservaComponent},
  { path: 'reservas', component: ReservasComponent},
  { path: 'facturacion', component: FacturaComponent},
  { path: 'ganancias', component: GananciasComponent},
  { path: 'calificacion', component: CalificacionesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
