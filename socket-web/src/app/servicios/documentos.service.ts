import { Injectable } from '@angular/core';
import  {Documentos} from './../modelos/documentos';
import  {SocketJwtService} from './socket-jwt.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  documentoActual = this.socket.fromEvent<Documentos>('gestionDato');
  docs = this.socket.fromEvent<string[]>('gestionDatos');

  constructor(private socket: SocketJwtService) { }

  leerDocumento(id: string){
    this.socket.emit('getDoc', id);
  }

  nuevoDocumento(doc){
    console.log(this.socket)
    if(this.socket.ioSocket.connected){
      this.socket.emit('addDoc', {id:'', doc:''} );
    }else{
    alert('No se pudo conectar con el servidor, token invalido')
    }
    
  }

  editaroDocumento(doc: Documentos){
    this.socket.emit('editDoc', doc);
  }

}
