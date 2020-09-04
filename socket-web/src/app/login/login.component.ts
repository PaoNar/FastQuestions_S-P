import { PermisosService } from '../servicios/permisos.service';
import { DataRx } from '../modelos/data-rx';
import { HttpHeaders} from '@angular/common/http';
import { LoginService} from '../servicios/login.service';
import { Router} from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, PatternValidator } from '@angular/forms';
import Swal from 'sweetalert2';
import { CrudService } from '../servicios/crud.service';

export interface DataLogin {
  data: {
    email: string,
    password: string,
  }
 }

 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnInit{
  dataLogin: DataLogin;
  loginForm: FormGroup;
  LoginService: any;
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    
    private loginService: LoginService,
    private permisos: PermisosService,
    private router: Router,
    private crudService: CrudService

  ) {}

  


  ngOnInit(): void {
    this._loginForm();
    this.dataLogin = {
      data: {
        email: '',
        password: '',
      }
    };


    this.registroForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      passw: ['', [Validators.required]],
      verifypassw: ['', [Validators.required]],
    });
  }

  _loginForm = () => {
    this.loginForm = this.formBuilder.group({
      email: ['', [ Validators.required]],
      password: ['', [ Validators.required]],
    });
    console.log(this.loginForm)
  };

  login(): void {
    this.dataLogin = {
      data: {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      }
    }
    //console.log(this.dataLogin)
    this.loginService.login(this.dataLogin).subscribe(
      (res: DataRx) => {
        if (res.transaccion) {
          if (this.permisos.decodificarToken(res.token)) {
            this.router.navigate(['/menu-encuestador']);
            // this.router.navigate(['/tabla-persona']);
            console.log(this.permisos.ObtenerUsuarioLogin());
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Bienvedid@',
              showConfirmButton: false,
              timer: 1500
            });
          }
        } else {
          this.dataLogin.data.email = '';
          this.dataLogin.data.password = '';
        }
      },
      error => {
        this.dataLogin.data.email = '';
        this.dataLogin.data.password = '';
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Correo y/o contraseña incorrectos',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
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
              this.router.navigate(['/menu-encuestador']);
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
  

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.code === 'Enter') {
      event.preventDefault();
      this.login();
    }
  }
  
}
