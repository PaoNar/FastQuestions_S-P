import { Injectable } from '@angular/core';
import { DataRx } from './../modelos/data-rx';
import { Usuario} from './../modelos/usuario';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
}) 
export class PermisosService {
  decodeToken(token: string) {
    throw new Error("Method not implemented.");
  }
  dataRx: DataRx;
  private token: string;
  private usuarioLogin: Usuario;
  private sessionID: string;
  private userRol: string;
  constructor() {
    this.token = null;
    this.usuarioLogin = null;
  }


  decodificarToken(token: string): boolean {
    const decoded = jwt_decode(token);

    if(decoded) {
      this.token = token || null;
      this.usuarioLogin = decoded.data || null;
      this.sessionID = this.usuarioLogin.sessionId || null;
      this.userRol = this.usuarioLogin.rol || null;
      delete this.usuarioLogin.sessionId;
      delete this.usuarioLogin.passw; //borramos el psw si esque llega
      return true;

    }else{
      return false;
    }
  }


  obtenerToken(): string {
    return this.token;
  }

  destruirToken(): void {
    this.token = null;
  }

  ObtenerUsuarioLogin(): object {
    return this.usuarioLogin;
  }

  obtenerSessionLogin(): string{
    return this.sessionID;
  }

  obtenerUserRol(): string{
    return this.userRol;
  }

}