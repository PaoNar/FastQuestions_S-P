import { PermisosService } from '../servicios/permisos.service';
import { DataRx } from '../modelos/data-rx';
import { HttpHeaders} from '@angular/common/http';
import { LoginService} from '../servicios/login.service';
import { Router} from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  constructor(
    private formBuilder: FormBuilder,
    
    private loginService: LoginService,
    private permisos: PermisosService,
    private router: Router

  ) {}

  


  ngOnInit(): void {
    this._loginForm();
    this.dataLogin = {
      data: {
        email: '',
        password: '',
      }
    };
  }

  _loginForm = () => {
    this.loginForm = this.formBuilder.group({
      email: ['', []],
      password: ['', []],
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
            this.router.navigate(['/encuestas']);
            //this.router.navigate(['/crear-doc']);
            console.log(this.permisos.ObtenerUsuarioLogin());
          }
        } else {
          this.dataLogin.data.email = '';
          this.dataLogin.data.password = '';
          
        }
      },
      error => {
        this.dataLogin.data.email = '';
        this.dataLogin.data.password = '';
        console.error(error);
      }
    );
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.code === 'Enter') {
      event.preventDefault();
      this.login();
    }
  }
  
}
