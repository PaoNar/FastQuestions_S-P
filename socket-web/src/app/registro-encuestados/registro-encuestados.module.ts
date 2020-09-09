import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroEncuestadosRoutingModule } from './registro-encuestados-routing.module';
import { CrearEncComponent } from './crear-enc/crear-enc.component';
import { EditarEncComponent } from './editar-enc/editar-enc.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ CrearEncComponent, EditarEncComponent],
  imports: [
    CommonModule,
    RegistroEncuestadosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistroEncuestadosModule { }
