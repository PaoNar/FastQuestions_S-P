import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'menu', loadChildren: () =>import('./menu/menu.module').then(m =>m.MenuModule)},
  {path: 'tabla-persona', loadChildren: () =>import('./tabla-persona/tabla-persona.module').then(m =>m.TablaPersonaModule)},
  {path: 'crear-doc', loadChildren: () =>import('./crear-doc/crear-doc.module').then(m =>m.CrearDocModule)},
  {path: 'persona', loadChildren: () =>import('./persona/persona.module').then(m =>m.PersonaModule)},
  {path: 'menu-encuestador', loadChildren: () =>import('./menu-encuestador/menu-encuestador.module').then(m =>m.MenuEncuestadorModule)},
  {path: 'encuestador', loadChildren: () =>import('./encuestador/encuestador.module').then(m =>m.EncuestadorModule)},
  {path: 'encuestas', loadChildren: () =>import('./encuestas/encuestas.module').then(m =>m.EncuestasModule)},
  {path: 'nueva-encuesta', loadChildren: () =>import('./nueva-encuesta/nueva-encuesta.module').then(m =>m.NuevaEncuestaModule)},
  {path: 'home', loadChildren: () =>import('./home/home.module').then(m =>m.HomeModule)},
  {path: 'encuestas-admin', loadChildren: () =>import('./encuestas-admin/encuestas-admin.module').then(m =>m.EncuestasAdminModule)},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
