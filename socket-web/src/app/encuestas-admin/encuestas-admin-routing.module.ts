import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestasAdminComponent } from './encuestas-admin.component';

const routes: Routes = [
  {path: '', component: EncuestasAdminComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestasAdminRoutingModule { }
