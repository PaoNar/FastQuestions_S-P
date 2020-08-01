import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './persona.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';


const routes: Routes = [
  {path: '', component: PersonaComponent},
  {path: 'crear', component: CrearComponent},
  {path: 'editar', component: EditarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
