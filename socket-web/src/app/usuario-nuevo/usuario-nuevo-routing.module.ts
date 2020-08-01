import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioNuevoComponent } from './usuario-nuevo.component';


const routes: Routes = [
  { path: '', component: UsuarioNuevoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioNuevoRoutingModule { }
