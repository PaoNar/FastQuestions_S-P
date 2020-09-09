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
import { PermisosService } from '../servicios/permisos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrls: ['./vista-cliente.component.scss']
})
export class VistaClienteComponent implements OnInit {
  respuestasEncuestaForm: FormGroup;

  private url: string;
  userData: any;
  preguntas: Array<any> = [];
  counter: number = 1;
  code: Array<number> = [];
  private router: Router

  constructor(
    private fb: FormBuilder,
    private servidor: WebServiceService,
    private http: HttpClient,
    private crudService: CrudService,
    private permisos: PermisosService,


  ) {
    this.url = servidor.obtenerUrl();
    this.userData = this.permisos.ObtenerUsuarioLogin()
  }

  ngOnInit(): void {
    this.getDatosEncuesta();

    this.respuestasEncuestaForm = this.fb.group({
      usuario: [this.userData.id],
      respuestas: this.fb.array([]),
    });
  }

  getDatosEncuesta(): void {
    let id = localStorage.getItem('encuestaID');

    this.http
      .get(
        `${this.url}get_idencuestas?id=${id}`,
        this.servidor.obtenerHeaders()
      )
      .subscribe((data: any) => {
        this.preguntas = data.data[0].contenido;
        // console.log(this.preguntas);
      });
  }

  onChange(pregunta: any, opcionSeleccionada: any) {
    const respuestasEncuestaFormArray = <FormArray>(
      this.respuestasEncuestaForm.controls.respuestas
    );

    let respuestas = this.respuestasEncuestaForm.get('respuestas').value,
      counter: number = 1;

    if (respuestas.length == 0 && this.code.length == 0) {
      respuestas.unshift({
        pregunta,
        opcion: opcionSeleccionada,
        code: counter,
      });
      this.code.push(counter);
    } else if (this.code.length <= this.preguntas.length - 1) {
      for (let element of respuestas) {
        for (let item of this.code) {
          if (element.pregunta == pregunta && item == element.code) {
            element.opcion = opcionSeleccionada;
            break;
          } else if (element.pregunta != pregunta) {
            this.code.forEach((item) => {
              if (item == counter) {
                counter += 1;
              }
            });
            respuestas.unshift({
              pregunta,
              opcion: opcionSeleccionada,
              code: counter,
            });
            this.code.push(counter);
            break;
          }
        }
        break;
      }
    } else {
      respuestas.forEach((element) => {
        this.code.forEach((item) => {
          if (element.pregunta == pregunta && item == element.code) {
            element.opcion = opcionSeleccionada;
          }
        });
      });
    }

    // console.log(this.respuestasEncuestaForm.value);
  }

  guardarRespuestas() {
    let datos = {
      "data":{
          "respuestas":[
            this.respuestasEncuestaForm.value
          ]
      }
  }

    let respuestas = this.crudService.putData(datos, 'update_encuestas', localStorage.getItem('encuestaID'));
    if ( respuestas != []) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha enviado correctamente',
        showConfirmButton: true,
        timer: 2000,
      });
      
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se enviaron los datos',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}
