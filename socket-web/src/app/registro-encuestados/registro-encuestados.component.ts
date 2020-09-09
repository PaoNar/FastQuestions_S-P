import { Component, OnInit } from '@angular/core';
import { CrudService } from '../servicios/crud.service';
import { PermisosService } from '../servicios/permisos.service';
import { WebServiceService } from '../servicios/web-service.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http'
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-registro-encuestados',
  templateUrl: './registro-encuestados.component.html',
  styleUrls: ['./registro-encuestados.component.scss']
})
export class RegistroEncuestadosComponent implements OnInit {
  user=[];
  private url:string;
  constructor(  private crudService:CrudService,
    private servidor: WebServiceService,
    private permisos:PermisosService,
    private router:Router,
    private http:HttpClient) { 
      this.url=servidor.obtenerUrl();
    }

  ngOnInit(): void {
    this.getPersonas()
  }

  getPersonas(): void {
    this.http
      .get(`${this.url}get_persona`, this.servidor.obtenerHeaders())
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.user.push(element);
        });
      });
  }

  public edit(user): void {
     sessionStorage.setItem('user', JSON.stringify(user));
     this.router.navigate(['/registro-encuestados/editar-enc' ]);
     }

  public delet(_id) {
     this.crudService.deleteData('delete_idpersona', _id); 
     this.router.navigate(['/registro-encuestados' ]);
     Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
 }

}
