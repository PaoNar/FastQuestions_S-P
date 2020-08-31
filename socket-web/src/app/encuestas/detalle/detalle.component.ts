import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from '../../servicios/web-service.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  _id: string
  encuesta=[];

  datosPersonas=[]

  private url:string;

  constructor(
    private servidor: WebServiceService,
    private http:HttpClient
    
  ) {
    this._id = localStorage.getItem("encuestaID")
    this.url=servidor.obtenerUrl();
   }

  ngOnInit(): void {
    this.getEncuesta();
  }

  getEncuesta() {
     this.http
      .get(`${this.url}get_idencuestas?id=${this._id}`, this.servidor.obtenerHeaders())
      .subscribe((data: any) => {
        let encuestados

        this.encuesta.push(data.data[0])
        encuestados = data.data[0].encuestados
        console.log(encuestados)

        encuestados.forEach(id => {
          this.http
          .get(`${this.url}get_idpersona?id=${id}`, this.servidor.obtenerHeaders())
          .subscribe((data: any) => {
            this.datosPersonas.push(data.data[0])
          });
        })
      });    
 
      console.log(this.datosPersonas)
  }
}
