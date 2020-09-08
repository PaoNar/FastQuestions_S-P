import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../servicios/web-service.service';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { PermisosService } from '../servicios/permisos.service';

@Component({
  selector: 'app-encuestado',
  templateUrl: './encuestado.component.html',
  styleUrls: ['./encuestado.component.scss']
})
export class EncuestadoComponent implements OnInit {
  encuestas=[];
  chart = [];
  doughnut =[];

  private url:string;
  constructor( private servidor: WebServiceService,
      private router:Router,
      private permisos: PermisosService,
      private http:HttpClient) { 
      this.url=servidor.obtenerUrl();
    }
  
  ngOnInit() {
    this.getEncuestas();
   
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  getEncuestas(): void {
    // console.log(this.permisos.ObtenerUsuarioLogin());
    let userData = this.permisos.ObtenerUsuarioLogin(),
      id = userData.id;

    this.http
      .get(`${this.url}get_encuestas`, this.servidor.obtenerHeaders())
      .subscribe((data: any) => {
        console.log(data.data)
        data.data.forEach(item => {
          console.log(item)
          item.encuestados.forEach(element => {
            if (element == id) {
              this.encuestas.push(item);
            }
          });
        });
      });
  }

  detallesEncuesta(id):void{
    localStorage.setItem("encuestaID", id),
    this.router.navigate(['/vista-cliente']);
  }
}
