import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,} from '@angular/router';
import { CrudService } from '../../servicios/crud.service';

@Component({
  selector: 'app-editar-enc',
  templateUrl: './editar-enc.component.html',
  styleUrls: ['./editar-enc.component.scss']
})
export class EditarEncComponent implements OnInit {
  user:any;
  regForm: FormGroup;
  constructor(    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private CrudService:CrudService,) {
       if (sessionStorage.getItem("user")) {
       this.user=JSON.parse(sessionStorage.getItem("user"));
    }
  }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
       apellido: ['', [Validators.required]],
       genero: ['', [Validators.required]],
       lastActiveAt: ['', [Validators.required]],
       email: ['', [Validators.required]],
   });
  }
  update(){
    let nombre = this.regForm.get('nombre').value;
    let apellido = this.regForm.get('apellido').value;
    let genero = this.regForm.get('genero').value;
    let lastActiveAt = this.regForm.get('lastActiveAt').value;
    let email = this.regForm.get('email').value;
    if (this.regForm.invalid) {
      console.log('Formulario no valido')
      } else {
        let Data = {
          data: {
            nombre,
            apellido,
            genero,
            lastActiveAt,
            email,
          },
        };
        let userData= this.CrudService.putData(
          Data,'update_persona',this.user._id);
          console.log(userData)
          
       if (userData) {
         console.log(this.user._id)
         console.log(Data)
         this.router.navigate(['/tabla-persona']);
         localStorage.clear();
         
       }
     }
  }
}
