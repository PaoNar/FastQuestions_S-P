import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CrudService } from '../servicios/crud.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(  private fb: FormBuilder,private crudService: CrudService, ) { }
  // declaraciones
  emailForm: FormGroup;
  user = [];
  // declaraciones


  ngOnInit( ): void {
    this.enviarCorreos()
    this.createEmailForm();
  }

  // FUNCIONES - INICIO
  createEmailForm() {
    this.emailForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern('^[A-Z]+[a-z]*$')]],
      mensaje: ["", [Validators.required, Validators.pattern('^[A-Z]+[a-z]*$')]],
      
    });
  }
  //FUNCIONES - FIN



  enviarCorreos() {
    let correos: Array<any> = [],
     encuestados = this.emailForm.get("encuestados").value;

    this.user.forEach(user_element => {
      encuestados.forEach(element => {
        if (user_element._id == element) {
            correos.push(user_element.email)
        }
      });
    });


    let preparacionEnvio = {
      datos: {
        correos
      }
    }
    let enviarCorreos = this.crudService.postData(preparacionEnvio, 'enviar_correo');
    if (enviarCorreos) {
      console.log("enviarCorreos")
      //this.router.navigate(['/login']);
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'no se enviaron los datos',
      showConfirmButton: false,
      timer: 2000,
    });
  }
  }

}
