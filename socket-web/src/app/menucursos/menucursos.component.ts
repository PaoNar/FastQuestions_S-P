import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


export interface dataCursos{
  data: {
    nombre: string,
    email: string,
  }
 }

@Component({
  selector: 'app-menucursos',
  templateUrl: './menucursos.component.html',
  styleUrls: ['./menucursos.component.scss']
})
export class MenucursosComponent implements OnInit {

  loginForm: FormGroup;
  data: { data: 
    { nombre: string;
     email: string; };
     };
     cursos;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router

  ) {}


  
  ngOnInit(): void {
    this.Form();
    this.data = {
      data: {
        nombre: '',
        email: '',
      }
    };
  }

  Form = () => {
    this.loginForm = this.formBuilder.group({
      nombre: ['', []],
      email: ['', []],
    });
    console.log(this.loginForm)
  };

  createUser(): void {
  //   this.data = {
  //     data: {
  //       email: this.loginForm.get('email').value,
  //       nombre: this.loginForm.get('nombre').value,

  //     }
  //   }


  //   if(this.createUser).subscribe(
  //     (data: any) => {
  //       if(data) {
  //         this.router.navigate(['/menucursos']);
  //       } else {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: 'Bienvenido',
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //       }
  //     },
  //     (err: any) => {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: `${err}/*`,
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
      
  //    })

  //  }
 }

  }
