import { AfterViewInit, Component, OnInit,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { WebServiceService } from '../servicios/web-service.service';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.scss']
})
export class TablaPersonaComponent implements  OnInit {
  user=[];

  private url:string;
  constructor( private servidor: WebServiceService,
      private http:HttpClient) { 
      this.url=servidor.obtenerUrl();
    }
  
  ngOnInit() {
    this.getPersonas();
    
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  getPersonas(): void {
    this.http
      .get(`${this.url}get_persona`, this.servidor.obtenerHeaders())
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.user.push(element);
        });
      });
  }
}





