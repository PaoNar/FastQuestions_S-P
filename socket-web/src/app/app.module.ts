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
//import { CrearDocComponent } from './crear-doc/crear-doc.component';

//const config: SocketIoConfig = {url: 'http://localhost:3500', options: {} }; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonaComponent,
    MenuComponent,
    TablaPersonaComponent
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
