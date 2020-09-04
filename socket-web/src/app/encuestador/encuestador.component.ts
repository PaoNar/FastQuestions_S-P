import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-encuestador',
  templateUrl: './encuestador.component.html',
  styleUrls: ['./encuestador.component.scss'],
})
export class EncuestadorComponent implements OnInit {
  chart = [];
  doughnut = [];

  constructor() {}

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
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
}
