import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestasRoutingModule } from './encuestas-routing.module';
import { DetalleComponent } from './detalle/detalle.component';


@NgModule({
  declarations: [DetalleComponent],
  imports: [
    CommonModule,
    EncuestasRoutingModule
  ]
})
export class EncuestasModule { }
