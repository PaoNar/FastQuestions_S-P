import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CrearComponent, EditarComponent],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonaModule { }
