import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroEncuestadosComponent } from './registro-encuestados.component';
import { CrearEncComponent } from './crear-enc/crear-enc.component';
import { EditarEncComponent } from './editar-enc/editar-enc.component';

const routes: Routes = [
  {path: '', component: RegistroEncuestadosComponent},
  {path: 'crear-enc', component: CrearEncComponent},
  {path: 'editar-enc', component: EditarEncComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroEncuestadosRoutingModule { }
