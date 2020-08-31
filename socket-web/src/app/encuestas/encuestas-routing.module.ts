import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestasComponent } from './encuestas.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  {path: '', component:EncuestasComponent },
  {path:'detalle', component:DetalleComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestasRoutingModule { }
