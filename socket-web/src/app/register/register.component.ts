import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  PatternValidator,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { CrudService } from '../servicios/crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  agregForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agregForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Z]+[a-z]*$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[A-Z]+[a-z]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z]+[a-zA-Z0-9._-ñ]*@[a-z]+[a-z0-9]*.[a-z]{2,3}[.]?[a-z]{2,3}$')]],
      genero: ['', [Validators.required, Validators.pattern('^[A-Z]+[a-z]*$')]],
      lastActiveAt: ['', [Validators.required]],
      rol: ['encuestador'],
      passw: ['', [Validators.required]],
      verifypassw: ['', [Validators.required]],
    });
  }
  crearPersona() {
    let nombre = this.agregForm.get('nombre').value;
    let apellido = this.agregForm.get('apellido').value;
    let genero = this.agregForm.get('genero').value;
    let email = this.agregForm.get('email').value;
    let passw = this.agregForm.get('passw').value;
    let verifypassw = this.agregForm.get('verifypassw').value;

    if (this.agregForm.valid) {
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
            rol: 'encuestador',
          },
        };

        let user: any = this.crudService.postData(datos, 'nuevo_persona');
        if (user != []) {
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
