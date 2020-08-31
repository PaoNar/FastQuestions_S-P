import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuEncuestadorComponent } from './menu-encuestador.component';

const routes: Routes = [
  {path: '', component:MenuEncuestadorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuEncuestadorRoutingModule { }
