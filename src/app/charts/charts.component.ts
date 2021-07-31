import { Component, OnInit } from '@angular/core'
import { Chart, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale} from 'chart.js';
import { LogRegService } from '../welcome-screen/welcome-screen/LogRegAddEstateService.service'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  cities : Array<string> = [];
  values : Array<number> = [];
  data : Array<{_id: string, count: number}> = [];
  houses : Array<string> = [];
  values1 : Array<number> = [];
  data1 : Array<{_id: string, count: number}> = [];
  constructor(private logRegService: LogRegService) {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale);
    this.logRegService.getAllEstatesByCity().subscribe(result => {
      this.data = JSON.parse(result);
      this.data.forEach(elem => {
        this.cities.push(elem._id);
        this.values.push(elem.count);
      })
      console.log(this.cities);
      const canvas = <HTMLCanvasElement> document.getElementById('myChart');
      const ctx = canvas.getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.cities,
          datasets: [{
            label: 'Real Estates by town',
            data: this.values,
            backgroundColor: [
              'rgba(201, 203, 207, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    this.logRegService.getAllHouseForSale().subscribe(result1 => {
      console.log(result1);
      const canvas = <HTMLCanvasElement> document.getElementById('myChart1');
      const ctx = canvas.getContext('2d');
      var myChart1 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['For sale'],
          datasets: [{
            label: 'Houses for sale',
            data: [result1],
            backgroundColor: [
              'rgba(201, 203, 207, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })

    this.logRegService.getAllApartmentsForSale().subscribe(result1 => {
      console.log(result1);
      const canvas = <HTMLCanvasElement> document.getElementById('myChart2');
      const ctx = canvas.getContext('2d');
      var myChart2 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['For sale'],
          datasets: [{
            label: 'Apartment for sale',
            data: [result1],
            backgroundColor: [
              'rgba(201, 203, 207, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })

    this.logRegService.getAllEstatesByPrice().subscribe(result1 => {
      console.log(result1);
      const canvas = <HTMLCanvasElement> document.getElementById('myChart3');
      const ctx = canvas.getContext('2d');
      var myChart3 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['0-100 000', '100 000-300 000', '300 000-500 000', '500 000-700 000', '700 000+'],
          datasets: [{
            label: 'Real Estates By Price',
            data: [result1.val1,result1.val2,result1.val3,result1.val4,result1.val5],
            backgroundColor: [
              'rgba(201, 203, 207, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
  }

  ngOnInit(): void {

  }

}
