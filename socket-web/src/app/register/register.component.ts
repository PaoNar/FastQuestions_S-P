import { Component, OnInit, HostListener } from '@angular/core';
import { PermisosService } from '../servicios/permisos.service';
import { DataRx } from '../modelos/data-rx';
import { HttpHeaders} from '@angular/common/http';
import { LoginService} from '../servicios/login.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, PatternValidator } from '@angular/forms';
import Swal from 'sweetalert2';
import { CrudService } from '../servicios/crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    
    private loginService: LoginService,
    private permisos: PermisosService,
    private router: Router,
    private crudService: CrudService

  ) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      passw: ['', [Validators.required]],
      verifypassw: ['', [Validators.required]],
    });
  }
 // nuevo registro

 crearPersona(){
  let email = this.registroForm.get('email').value;
  let passw = this.registroForm.get('passw').value;
  let verifypassw = this.registroForm.get('verifypassw').value;
  if (this.registroForm.valid) {
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
          email,
          passw,
        },
      };
      let user = this.crudService.postData(datos,'nuevo_persona');
      if (user) {
          this.router.navigate(['/encuestador']);
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
