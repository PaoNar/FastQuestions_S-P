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
  respuestasEncuestaForm: FormGroup;

  constructor(private fb: FormBuilder, private crudService: CrudService, private servidor: WebServiceService, private http: HttpClient) {
    this.url=servidor.obtenerUrl();

   }

  ngOnInit(): void {
    this.getDatosEncuesta();

    this.respuestasEncuestaForm = this.fb.group({
      respuestas: this.fb.array([]),
    });
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

  onChange(pregunta: string, opcionSeleccionada: any) {
    const respuestasEncuestaFormArray = <FormArray>this.respuestasEncuestaForm.controls.respuestas;
    
    let respuestas = this.respuestasEncuestaForm.get("respuestas").value,
      tempOpcion,
      tempPregunta

    if (respuestas.length == 0) {
      respuestasEncuestaFormArray.push(new FormControl(
        {
          user: localStorage.getItem("encuestaID"),
          pregunta,
          opcion: opcionSeleccionada
        }
      ));
      tempPregunta = pregunta;
      tempOpcion = opcionSeleccionada;
      console.log(this.respuestasEncuestaForm.get("respuestas").value);
    }

    respuestas.forEach(element => {
      if (element.pregunta == pregunta) {
        respuestasEncuestaFormArray.patchValue([
          {
            user: localStorage.getItem("encuestaID"),
            pregunta: element.pregunta,
            opcion: opcionSeleccionada
          }
        ])
        console.log(this.respuestasEncuestaForm.get("respuestas").value);
        console.log("patch");
      } 
      // if (element.pregunta != tempPregunta) {
      //   respuestasEncuestaFormArray.push(new FormControl(
      //     {
      //       user: localStorage.getItem("encuestaID"),
      //       pregunta,
      //       opcion: opcionSeleccionada
      //     }
      //   ));
      //   counter = 1;
      //   console.log(counter)
      //   console.log(this.respuestasEncuestaForm.get("respuestas").value)
      // }
    });

    if (tempPregunta != pregunta) {
      respuestasEncuestaFormArray.push(new FormControl(
        {
          user: localStorage.getItem("encuestaID"),
          pregunta,
          opcion: opcionSeleccionada
        }
      ))
      tempPregunta = pregunta;
      console.log(this.respuestasEncuestaForm.get("respuestas").value);
    }
  }
}
