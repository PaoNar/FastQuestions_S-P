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
  _idEncuesta: string;
  respuestasUsuarios: Array<any>;
  preguntasEncuesta: Array<any> = [];
  opcionesPregunta: Array<any> = []

  datosPersonas = [];
  chart = [];
  doughnut =[];

  private url: string;

  constructor(private servidor: WebServiceService, private http: HttpClient) {
    this._idEncuesta = localStorage.getItem('encuestaID');
    this.url = servidor.obtenerUrl();
  }

  ngOnInit(): void {
    this.getEncuesta();
    // console.log(this.respuestasUsuarios);  

    // this.chart = new Chart('canvas', {
    //   type: 'line',
    //   data: {
    //     labels: ["si", "no"],
    //     datasets: [
    //       {
    //         type: 'bar',
    //         label:"Hombres",
    //         data: this.preguntasEncuesta,
    //         backgroundColor: 'rgba(255,0,255,0.4)',
    //         borderColor: 'rgba(255,0,255,0.4)',
    //         fill: false,
    //       },
    //       {
    //         type: 'bar',
    //         label: "Mujeres",
    //         data: [789, 987].reverse(),
    //         backgroundColor: 'rgba(0,0,255,0.4)',
    //         borderColor: 'rgba(0,0,255,0.4)',
    //         fill: false,
    //       },
    //     ],
    //   },
    // });

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
            data: [60, 40],
            backgroundColor: ['red', 'orange'],
            label: 'Dataset 1',
          },
        ],
        labels: ["Si", "No"],
      },
    });
  }

  getEncuesta() {
    this.http
      .get(
        `${this.url}get_idencuestas?id=${this._idEncuesta}`,
        this.servidor.obtenerHeaders()
      )
      .subscribe((data: any) => {
        this.respuestasUsuarios = data.data[0].respuestas
      
        this.getDataCharts()

        data.data[0].encuestados.forEach((id) => {
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
  }

  getDataCharts() {
    console.log(this.respuestasUsuarios[0].respuestas);
    let counter: number = 0,
      tempOpcion

    this.respuestasUsuarios[0].respuestas.forEach(element => {
      this.preguntasEncuesta.push(element.pregunta)
      
      if (element.opcion == "no") {
        //console.log(element.opcion)
        tempOpcion = element.opcion
        counter += 1
      } 
    });

    
    let temp = {
      opcion: tempOpcion,
      counter: counter += 1
    }

    this.opcionesPregunta.push(temp)
    console.log(this.opcionesPregunta);

    //console.log(this.preguntasEncuesta)
  }
}
