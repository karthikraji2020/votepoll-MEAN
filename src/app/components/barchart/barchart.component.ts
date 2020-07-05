import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './../../service/models/Data.interface.';
import { Chart } from 'chart.js'; 

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  data: Data[];  
  url = 'http://votepollsystem.herokuapp.com/api/posts';  
  // url = 'http://localhost:58617/API/Charts/GetCharts';  
  votes = [];  
  title = [];  
  ViewChild: any
  barchart :any;  
  // barchart = [];  
  constructor(private http: HttpClient) { }  
  ngOnInit() {  
    // this.gettingData();
    this.renderChart();
   
   
}
// load data 
  renderChart() {
    this.barchart = new Chart('canvas', {  
      type: 'bar',  
      data: {  
        labels: this.title,  
        // labels:["test","test1","test2","test3","demoe","demoe1"],  
        datasets: [  
          {  
            data: this.votes,  
            // data:  ["23","25","1","9","23","19"],  
            borderColor: '#3cba9f',  
            backgroundColor: [  
              "#3cb371",  
              "#0000FF",  
              "#9966FF",  
              "#4C4CFF",  
              "#00FFFF",  
              "#f990a7",  
              "#aad2ed",  
              "#FF00FF",  
              "Blue",  
              "Red",  
              "Blue"  
            ],  
            fill: true  
          }  
        ]  
      },  
      options: {  
        legend: {  
          display: false  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true  
          }],  
        }  
      }  
    });  
  }
  gettingData(data:Data[]) {
    data.forEach(x => {  
      this.title.push(x.title);  
      this.votes.push(x.votes);  
    });
    this.renderChart();
  }

  loadData() {
  this.http.get(this.url).subscribe((result: Data[]) => {  
    result.forEach(x => {  
      this.title.push(x.title);  
      this.votes.push(x.votes);  
    });
      
    this.barchart = new Chart('canvas', {  
      type: 'bar',  
      data: {  
        labels:["test","test1","test2","test3","demoe","demoe1"],  
        datasets: [  
          {  
            // data: this.Run,  
            data:  ["23","25","1","9","23","19"],  
            borderColor: '#3cba9f',  
            backgroundColor: [  
              "#3cb371",  
              "#0000FF",  
              "#9966FF",  
              "#4C4CFF",  
              "#00FFFF",  
              "#f990a7",  
              "#aad2ed",  
              "#FF00FF",  
              "Blue",  
              "Red",  
              "Blue"  
            ],  
            fill: true  
          }  
        ]  
      },  
      options: {  
        legend: {  
          display: false  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true  
          }],  
        }  
      }  
    });  
    this.renderChart();
  });  

}
// update charts with animations
 
}
