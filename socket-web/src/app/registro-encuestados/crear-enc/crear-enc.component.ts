import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../servicios/crud.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-enc',
  templateUrl: './crear-enc.component.html',
  styleUrls: ['./crear-enc.component.scss']
})
export class CrearEncComponent implements OnInit {
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
      genero: ['', [Validators.required]],
      rol:['encuestado'],
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
      let rol = this.personaForm.get('rol').value;
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
              rol,
              lastActiveAt,
              passw,
            },
          };
          let user = this.crudService.postData(datos,'nuevo_persona');
          if (user) {
              this.router.navigate(['/registro-encuestados']);
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
