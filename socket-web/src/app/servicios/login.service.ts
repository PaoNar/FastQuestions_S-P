import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermisosService } from './permisos.service';
import { WebServiceService } from './web-service.service';
import { DataRx } from './../modelos/data-rx';
import { HttpClient } from '@angular/common/http';
import { DataLogin } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string;

  constructor(
    private http: HttpClient,
    private servidor: WebServiceService,
    private permisos: PermisosService
  ) {
    this.url = servidor.obtenerUrl();
   }

   login(datalogin):Observable<DataRx>{
    return this.http.post<DataRx>(`${this.url}login`, datalogin);
 }
  
}
