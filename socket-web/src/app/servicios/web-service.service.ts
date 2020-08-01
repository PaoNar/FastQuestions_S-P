import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { PermisosService} from './permisos.service';


@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  private url: string;

  constructor(private permisos: PermisosService) { 
    this.url= 'http://localhost:3500/api/';
  }

  obtenerUrl(): string {
    return this.url;
  }

  obtenerHeaders(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.permisos.obtenerToken()
      })
    };
    return optionsHeaders;
  }

  obtenerHeadersArchivo(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Authorization: this.permisos.obtenerToken()
      })
    };
    return optionsHeaders;
  }
}
