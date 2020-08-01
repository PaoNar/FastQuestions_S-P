import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Usuario } from '../../modelos/usuario';


export interface dataCursos{
  data: {
    nombre: string,
    email: string,
  }
 }

@Component({
  selector: 'app-insertcursos',
  templateUrl: './insertcursos.component.html',
  styleUrls: ['./insertcursos.component.scss'],
})

export class InsertcursosComponent implements OnInit {
  createcursoForm: FormGroup;
  dataCursos: { data: { nombre: string; email: string; }; };
  private subscribe: Subscription;
  permisos: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createcursoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }
  registerCurso(): void {
    this.dataCursos = {
      data: {
        nombre: `${this.createcursoForm.get('nombre').value}`,
        email: `${this.createcursoForm.get('email').value}`,
      },
    }

    // if(this.createcursoForm.valid).subscribe(
    //   (data: any) => {
    //     if(data) {
    //       this.router.navigate(['/menucursos']);
    //     } else {
    //       Swal.fire({
    //         position: 'center',
    //         icon: 'success',
    //         title: 'Bienvenido',
    //         showConfirmButton: false,
    //         timer: 2000,
    //       });
    //     }
    //   },
    //   (err: any) => {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       title: `${err}/*`,
    //       showConfirmButton: false,
    //       timer: 2000,
    //     });
      
    //  })

   }
 }
    
  

