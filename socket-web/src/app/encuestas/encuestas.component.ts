import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../servicios/web-service.service';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

  encuestas=[];
  chart = [];
  doughnut =[];

  private url:string;
  constructor( private servidor: WebServiceService,
      private router:Router,
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
    this.http
      .get(`${this.url}get_encuestas`, this.servidor.obtenerHeaders())
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.encuestas.push(element);
        });
      });
  }

  detallesEncuesta(id):void{
    localStorage.setItem("encuestaID", id),
    this.router.navigate(['/encuestas/detalle']);
  }
}
