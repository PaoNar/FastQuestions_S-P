import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenucursosComponent } from './menucursos.component';
import { InsertcursosComponent } from './insertcursos/insertcursos.component';
//import { UpdatecursosComponent } from './updatecursos/updatecursos.component'
const routes: Routes = [
  { path: '', component: MenucursosComponent },
  { path: 'insertcurso', component: InsertcursosComponent },
  //{ path: 'updatecurso', component: UpdatecursosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenucursosRoutingModule { }
