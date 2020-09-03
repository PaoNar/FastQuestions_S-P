import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevaEncuestaComponent } from './nueva-encuesta.component';

const routes: Routes = [
  {path: '', component:NuevaEncuestaComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevaEncuestaRoutingModule { }
