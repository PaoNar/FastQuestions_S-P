import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearDocComponent } from './crear-doc.component';


const routes: Routes = [
  {path: '', component: CrearDocComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearDocRoutingModule { }
