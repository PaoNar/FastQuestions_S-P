import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaClienteComponent } from './vista-cliente.component';

const routes: Routes = [
  {path: '', component: VistaClienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaClienteRoutingModule { }
