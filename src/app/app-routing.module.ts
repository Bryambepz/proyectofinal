import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './page/crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './page/listar-cliente/listar-cliente.component';
import { MainComponent } from './page/main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'crear-cliente', component: CrearClienteComponent},
  { path: 'listar-cliente', component: ListarClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
