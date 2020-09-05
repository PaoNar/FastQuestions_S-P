import { AfterViewInit, Component, OnInit,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { WebServiceService } from '../servicios/web-service.service';
import { HttpClient } from '@angular/common/http';
import { Chart} from 'chart.js'
import { PermisosService } from '../servicios/permisos.service';

@Component({
  selector: 'app-tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.scss']
})
export class TablaPersonaComponent implements  OnInit {
  user=[];
  chart = [];
  doughnut =[];
  userRol: any

  private url:string;
  constructor( private servidor: WebServiceService, private permisos: PermisosService,
      private http:HttpClient) { 
      this.url=servidor.obtenerUrl();
      this.userRol = this.permisos.obtenerUserRol()
    }
  
  ngOnInit() {
    this.getPersonas();
    this.chart =new Chart('canvas',{
      type:'line',
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        datasets: [
          {
            type: 'bar',
            label: 'My First dataset',
            data: [243, 156, 365, 30, 156, 265, 356, 543],
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false,
          },
          {
            type: 'bar',
            label: 'My Second dataset',
            data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            fill: false,
          }
        ]
      }
    });

    this.doughnut =  new Chart('doughnut',{
      type: 'doughnut',
      options: {
        responsive: true,
        title: {
          display: true,
          // text: 'Doughnut Chart'
        },legend: {
					position: 'top',
				},animation: {
					animateScale: true,
					animateRotate: true
				}
      },
      data: {
				datasets: [{
					data: [45,10,5,25,15],
					backgroundColor: ["red","orange","yellow","green","blue"],
					label: 'Dataset 1'
				}],
				labels: ['Red','Orange','Yellow','Green','Blue']
			}
    })
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





