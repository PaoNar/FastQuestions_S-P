import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../servicios/crud.service';
import { PermisosService } from '../../servicios/permisos.service';
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
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      verifypassw: ['', [Validators.required]],
    });
  }

  crearPersona(){
    let nombre = this.personaForm.get('nombre').value;
      let apellido = this.personaForm.get('apellido').value;
      let email = this.personaForm.get('email').value;
      let password = this.personaForm.get('password').value;
      let verifypassw = this.personaForm.get('verifypassw').value;
      if (this.personaForm.valid) {
        if (password != verifypassw) {
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
              email,
              password,
            },
          };
          let user = this.crudService.postData(datos,'insertar_persona');
          if (user) {
              this.router.navigate(['/persona']);
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
  