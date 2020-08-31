import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestadorComponent } from './encuestador.component';

const routes: Routes = [
  {path: '', component:EncuestadorComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestadorRoutingModule { }
