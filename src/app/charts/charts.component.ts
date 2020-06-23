import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  agenciesFilter = new FormControl('1');
  districtsFilter = new FormControl('1');
  daysFilter = new FormControl('1');

  realTimeActivity = [
    {
      product: 'APKU-43B',
      person: 'Sudhakar',
      date:new Date().setHours(new Date().getHours() - 1)
    },
    {
      product: 'APKU-44B',
      person: 'Sudhakar',
      date: new Date().setHours(new Date().getHours() - 5)
    },
    {
      product: 'APKU-45B',
      person: 'Sudhakar',
      date: new Date().setHours(new Date().getDate() - 5)
    },
    {
      product: 'APKU-46B',
      person: 'Sudhakar',
      date: new Date().setDate(new Date().getDate() - 4)
    },
    {
      product: 'APKU-47B',
      person: 'Sudhakar',
      date: new Date().setHours(new Date().getHours() - 5)
    },
    {
      product: 'APKU-48B',
      person: 'Sudhakar',
      date: new Date().setHours(new Date().getHours() - 5)
    }
  ];
  agencies = [
    {
      label: 'All Agencies',
      value: '1'
    },
    {
      label: 'Agency 1',
      value: '2'
    },
    {
      label: 'Agency 2',
      value: '3'
    }
  ];
  districts = [
    {
      label: 'Last 7 days',
      value: '1'
    },
    {
      label: 'District 1',
      value: '2'
    },
    {
      label: 'District 2',
      value: '3'
    }
  ];
  days = [
    {
      label: 'Parcels',
      value: '1'
    },
    {
      label: 'Yesterday',
      value: '2'
    },
    {
      label: 'Day Before Yesterday',
      value: '3'
    }
  ];

  @ViewChild('myCanvas')
  public canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = 'line';
  public chartData: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;
  constructor() { }

  ngOnInit() {
    this.chartData = [{
      data: [0, 0, 0, 0, 5],
      label: 'chart',
      fill: false
    }];
    this.chartLabels = [this.GetFormattedDate(4), this.GetFormattedDate(3), this.GetFormattedDate(2), this.GetFormattedDate(1), this.GetFormattedDate(0)];
    this.chartColors = [{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
         borderColor: 'rgba(0, 0, 0, 1)'
    }];
    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      },
    }
  }
  diff_hours(dt1) {
    dt1 = new Date(dt1);
    let dt2 = new Date();
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));

  }
  GetFormattedDate(d) {
       let today = new Date();
       return today.getDate() - d + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
}

}
