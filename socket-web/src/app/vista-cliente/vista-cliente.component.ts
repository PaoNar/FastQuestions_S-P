import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CrudService } from '../servicios/crud.service';
import { WebServiceService } from '../servicios/web-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrls: ['./vista-cliente.component.scss']
})
export class VistaClienteComponent implements OnInit {
  private url:string;
  preguntas: Array<any> = [];

  constructor(private fb: FormBuilder, private crudService: CrudService, private servidor: WebServiceService, private http: HttpClient) {
    this.url=servidor.obtenerUrl();

   }

  ngOnInit(): void {
    this.getDatosEncuesta();
  }

  getDatosEncuesta(): void {
    let id = localStorage.getItem("encuestaID");

    this.http
      .get(`${this.url}get_idencuestas?id=${id}`, this.servidor.obtenerHeaders())
      .subscribe((data: any) => {
        this.preguntas = data.data[0].contenido
        console.log(this.preguntas)
      });
  }
}
