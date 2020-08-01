import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentosService } from '../../servicios/documentos.service';

import { Subscription } from 'rxjs';
import { Documentos} from '../../modelos/documentos';
import { startWith} from 'rxjs/operators';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit , OnDestroy{

  documento: Documentos;
  private _docSub: Subscription;
  unsubscribe: Subscription;

  constructor(private documentosService: DocumentosService) { }

  ngOnInit() {
    this._docSub = this.documentosService.documentoActual.pipe(
      startWith({id: '', doc: 'seleccione un documento o cree uno nuevo '})
    ).subscribe(documento => this.documento = documento); 
  }

  ngOnDestroy() {
    this._docSub = this.unsubscribe;
  }

  editarDocumento(){
    this.documentosService.editaroDocumento(this.documento);
  }



}
