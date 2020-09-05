import { Component, OnInit } from '@angular/core';
import { CrudService } from '../servicios/crud.service';

import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  PatternValidator,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  personaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      email: ['', [Validators.required]],
      passw: ['', [Validators.required]],
      verifypassw: ['', [Validators.required]],
    });
  }
  // nuevo registro

  registrarPersona() {
    let nombre = this.personaForm.get('nombre').value;
    let apellido = this.personaForm.get('apellido').value;
    let genero = this.personaForm.get('genero').value;
    let email = this.personaForm.get('email').value;
    let passw = this.personaForm.get('passw').value;
    let verifypassw = this.personaForm.get('verifypassw').value;

    if (this.personaForm.valid) {
      if (passw != verifypassw) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No conisiden las contraseñas',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        let datos = {
          data: {
            nombre,
            apellido,
            genero,
            email,
            passw,
            verifypassw,
            rol: 'Encuestador',
          },
        };

        let user: any = this.crudService.postData(datos, 'nuevo_persona');
        if (user =! []) {
          this.router.navigate(['/login']);
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
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Todos los campos son requeridos',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}
