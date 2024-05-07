import { Component, DoCheck, Output, EventEmitter, Input } from '@angular/core';
import { DashboardCard } from '../../models/dashboard-card.model';
import * as Highcharts from 'highcharts';
import { WidgetService } from '../../_common-services/widget.service';
//import { Console } from 'console';

@Component({
  selector: 'lib-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements DoCheck {

  constructor(private widgetService: WidgetService) {
    this.widgetService.widgetsChartName.subscribe(this.setChartsFlag);
  }

  public setindex:number=0;
  setChartsFlag = (chartName) => {
    if (chartName != null && chartName != undefined) {
      console.log("setChartsFlag " + (this.setindex + 1))
      this.setindex = this.setindex + 1;
      if (chartName.toLowerCase() == "area chart") {
        this.areaChart = true;
        this.barChart = false;
        this.pieChart = false;
      }
      else if (chartName.toLowerCase() == "bar chart") {
        this.areaChart = false;
        this.barChart = true;
        this.pieChart = false;
      }
      else if (chartName.toLowerCase() == "pie chart") {
        this.areaChart = false;
        this.barChart = false;
        this.pieChart = true;
      }
    }
  }

  @Output()
  widgetRemoved = new EventEmitter<DashboardCard>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'area'
    },
    title: {
      text: 'Area Chart'
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    credits: {
      enabled: false
    },
    yAxis: {
      title: {
        text: 'Area YAxis'
      }
    },
    series: [{
      name: 'John',
      type: undefined,
      data: [5, 3, 4, 7, 2]
    },
    {
      name: 'Jane',
      type: undefined,
      data: [2, -2, -3, 2, 1]
    },
    {
      name: 'Joe',
      type: undefined,
      data: [3, 4, 4, -2, 5]
    }]
  };

  barchartOptions: Highcharts.Options = {
    chart: {
      //type: 'bar',
      type: 'column' // Set chart type to column for vertical bars
      //marginBottom: 180 // Adjust margin bottom to accommodate x-axis labels
    },
    title: {
      text: 'Bar Chart'
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges'],
      // opposite: false, // Optional: Set to false to move the labels to the bottom
      // reversed: false  // Optional: Set to false if you want the categories to be listed in the order provided
      // labels: {
      //   rotation: -90 // Rotate labels 90 degrees counterclockwise
      // }
    },
    credits: {
      enabled: false
    },
    yAxis: {
      title: {
        text: 'Fruit Quantity'
      }
    },
    series: [{
      name: 'Quantity1',
      type: undefined,
      data: [10, 15, 20] // Example data
    },
    {
      name: 'Quantity2',
      type: undefined,
      data: [15, 10, 35] // Example data
    }]
  };

  pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie', // Set chart type to pie
      height: 150, // Set the height of the pie chart
      width: 100,   // Set the width of the pie chart
      margin: [0, 0, 0, 0], // Set the margin to zero to center the chart
      spacingTop: 0, // Remove top spacing
      spacingBottom: 0, // Remove bottom spacing
      spacingLeft: 0, // Remove left spacing
      spacingRight: 0 // Remove right spacing
    },
    title: {
      text: 'Pie Chart'
    },
    xAxis: {
      categories: ['Pie X-Axis']
    },
    credits: {
      enabled: false
    },
    yAxis: {
      title: {
        text: 'Pie Y-Axis'
      }
    },
    series: [{
      name: 'Fruits', // Name of the series      
      type: undefined,
      data: [
        { name: 'Apples', y: 19 }, // Data for each slice
        { name: 'Bananas', y: 34 },
        { name: 'Oranges', y: 46 }
      ]
    }]
  };
  chart: Highcharts.Chart;
  card: DashboardCard;
  cards: DashboardCard;


  onWidgetRemoved(event) {
    //this.widgetRemoved.emit(this.card);
    this.widgetRemoved.emit(event);
    this.cards
  }

  ngDoCheck() {
    this.resize();
  }

  resize() {
    if (this.chart) {
      this.chart.reflow();
    }
  }

  public areaChart: boolean = false;
  public barChart: boolean = true;
  //public barChart: boolean = false;
  public pieChart: boolean = false;
  public index:number=0;
  onChartInstanceReceived(chart: Highcharts.Chart) {
    //if(this.setindex > 0){
      console.log("chart " + (this.index + 1))
      this.index = this.index + 1;
      this.chart = chart;
    //}
    // if(this.chart != null && this.chart != undefined){
    //   //console.log(this.chart.userOptions.title.text);
    //   if(this.chart.userOptions.title.text.toLowerCase() == "area chart"){
    //     this.areaChart = true;
    //     this.barChart = false;
    //     this.pieChart = false;
    //   }
    //   else if(this.chart.userOptions.title.text.toLowerCase() == "bar chart"){
    //     this.areaChart = false;
    //     this.barChart = true;
    //     this.pieChart = false;
    //   }
    //   else if(this.chart.userOptions.title.text.toLowerCase() == "pie chart"){
    //     this.areaChart = false;
    //     this.barChart = false;
    //     this.pieChart = true;
    //   }

    // }
  }


}
