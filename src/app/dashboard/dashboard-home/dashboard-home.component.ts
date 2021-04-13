import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  public barChartOptions ={
    scaleShowVerticalLines:false,
    responsive:true
  };
  public barChartLabels =['2006','2007','2008','2009','2010','2011','2012'];
  public barChartType ='bar';
  public barChartLegend=true;

  public barChartData =[
    {data:[65,86,25,55,68,74,32],label:'series A'},
    {data:[55,68,52,36,86,47,23],label:'series B'}

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
