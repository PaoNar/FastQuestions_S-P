import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaPersonaComponent } from './tabla-persona.component';


const routes: Routes = [
  {path: '', component: TablaPersonaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablaPersonaRoutingModule { }
