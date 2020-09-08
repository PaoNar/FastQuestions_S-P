import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { DocumentosComponent } from './documentos/documentos.component';
//import { ListaDocumentosComponent } from './lista-documentos/lista-documentos.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { SocketJwtService } from './servicios/socket-jwt.service';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PersonaComponent } from './persona/persona.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TablaPersonaComponent } from './tabla-persona/tabla-persona.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MenuEncuestadorComponent } from './menu-encuestador/menu-encuestador.component';
import { EncuestadorComponent } from './encuestador/encuestador.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { NuevaEncuestaComponent } from './nueva-encuesta/nueva-encuesta.component';
import { HomeComponent } from './home/home.component';
import { EncuestasAdminComponent } from './encuestas-admin/encuestas-admin.component';
import { RegisterComponent } from './register/register.component';
import { VistaClienteComponent } from './vista-cliente/vista-cliente.component';
import { EncuestadoComponent } from './encuestado/encuestado.component';
//import { CrearDocComponent } from './crear-doc/crear-doc.component';

//const config: SocketIoConfig = {url: 'http://localhost:3500', options: {} }; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonaComponent,
    MenuComponent,
    TablaPersonaComponent,
    MenuEncuestadorComponent,
    EncuestadorComponent,
    EncuestasComponent,
    NuevaEncuestaComponent,
    HomeComponent,
    EncuestasAdminComponent,
    RegisterComponent,
    VistaClienteComponent,
    EncuestadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //SocketIoModule.forRoot(config)
    SocketIoModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatTableModule
  ],
  providers: [SocketJwtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
