import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from '../../servicios/web-service.service';
import { Chart} from 'chart.js'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  _id: string;
  encuesta = [];

  datosPersonas = [];
  chart = [];
  doughnut =[];

  private url: string;

  constructor(private servidor: WebServiceService, private http: HttpClient) {
    this._id = localStorage.getItem('encuestaID');
    this.url = servidor.obtenerUrl();
  }

  ngOnInit(): void {
    this.getEncuesta();

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Si', 'No'],
        datasets: [
          {
            type: 'bar',
            label: 'Mujeres',
            data: [243, 156],
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false,
          },
          {
            type: 'bar',
            label: 'Hombres',
            data: [243, 156].reverse(),
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            fill: false,
          },
        ],
      },
    });

    this.doughnut = new Chart('doughnut', {
      type: 'doughnut',
      options: {
        responsive: true,
        title: {
          display: true,
          // text: 'Doughnut Chart'
        },
        legend: {
          position: 'top',
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
      data: {
        datasets: [
          {
            data: [45, 10, 5, 25, 15],
            backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
            label: 'Dataset 1',
          },
        ],
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      },
    });
  }

  getEncuesta() {
    this.http
      .get(
        `${this.url}get_idencuestas?id=${this._id}`,
        this.servidor.obtenerHeaders()
      )
      .subscribe((data: any) => {
        let encuestados;

        this.encuesta.push(data.data[0]);
        encuestados = data.data[0].encuestados;
        console.log(encuestados);

        encuestados.forEach((id) => {
          this.http
            .get(
              `${this.url}get_idpersona?id=${id}`,
              this.servidor.obtenerHeaders()
            )
            .subscribe((data: any) => {
              this.datosPersonas.push(data.data[0]);
            });
        });
      });

    console.log(this.datosPersonas);
  }
}
