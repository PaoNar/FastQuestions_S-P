import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../servicios/crud.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {
  personaForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router ) {}

  ngOnInit(): void {
    this.personaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Z]+[a-z]*$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[A-Z]+[a-z]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z]+[a-zA-Z0-9._-ñ]*@[a-z]+[a-z0-9]*.[a-z]{2,3}[.]?[a-z]{2,3}$')]],
      genero: ['', [Validators.required, Validators.pattern('^[A-Z]+[a-z]*$')]],
      lastActiveAt: ['', [Validators.required]],
      passw: ['', [Validators.required]],
      verifypassw: ['', [Validators.required]],

    });
  }

  crearPersona(){
      let nombre = this.personaForm.get('nombre').value;
      let apellido = this.personaForm.get('apellido').value;
      let genero = this.personaForm.get('genero').value;
      let email = this.personaForm.get('email').value;
      let lastActiveAt = this.personaForm.get('lastActiveAt').value;
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
              lastActiveAt,
              passw,
            },
          };
          let user = this.crudService.postData(datos,'nuevo_persona');
          if (user) {
              this.router.navigate(['/persona']);
          }
        }
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Datos Invalidos',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  }
  