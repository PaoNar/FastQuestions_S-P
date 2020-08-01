import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioNuevoRoutingModule } from './usuario-nuevo-routing.module';
import { UsuarioNuevoComponent } from './usuario-nuevo.component';


@NgModule({
  declarations: [UsuarioNuevoComponent],
  imports: [
    CommonModule,
    UsuarioNuevoRoutingModule
  ]
})
export class UsuarioNuevoModule { }
