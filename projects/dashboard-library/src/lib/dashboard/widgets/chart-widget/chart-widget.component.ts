import { Component, DoCheck, Output, EventEmitter, Input } from '@angular/core';
import { DashboardCard } from '../../models/dashboard-card.model';
import * as Highcharts from 'highcharts';
import { WidgetService } from '../../_common-services/widget.service';
//import { Console } from 'console';

@Component({
  selector: 'lib-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.css']
})
export class ChartWidgetComponent implements DoCheck {

  constructor(private widgetService: WidgetService) {
    this.widgetService.widgetsChartName.subscribe(this.setChartsFlag);
    this.widgetService.actualData.subscribe(this.getDashboardData);
  }

  public actualDashboarData: any = [];
  public setindex: number = 0;
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

  getDashboardData = (data) => {
    this.actualDashboarData = data;
    this.chartOptions
    if (this.actualDashboarData != null && this.actualDashboarData != undefined) {
      let areaCategories:any = {categories: []};
      let areaSeries:any = [{data:[], name:"", type:undefined}]
      let barCategories:any = {categories: []};
      let barSeries:any = [{data:[], name:"", type:undefined}]
      let pieSeries:any = [{data:[], name:"", type:undefined}]
      this.chartOptions.xAxis = areaCategories;
      this.chartOptions.series = areaSeries;
      this.barchartOptions.xAxis = barCategories;
      this.barchartOptions.series = barSeries;
      this.pieChartOptions.series = pieSeries;
      let item: any = [];
      let currentTabData: any = [];
      //item = this.actualDashboarData.dashboardDetailDataRead.filter((x: any) => x.id == this.tabID);
      item = this.actualDashboarData.dashboardDetailDataRead[0];
      //currentTabData = this.actualDashboarData.dashboardDetailItemDataRead.filter((y: any) => y.table_id == this.tabID);
      currentTabData = this.actualDashboarData.dashboardDetailItemDataRead.filter((y: any) => y.table_id == item.id);
      if (currentTabData != null && currentTabData != undefined && currentTabData.length > 0) {
        currentTabData.forEach((element: any, i) => {
          //working for bar-chart start
          barSeries[0].name = item.table_name;
          barSeries[0].data.push(Number(element.total_count.toString().trim()));
          barCategories.categories.push(element.hdr_name.toString().trim());
          //working for bar-chart end
          
          //working for pie-chart start
          pieSeries[0].name = item.table_name;
          //pieSeries[0].data.push(Number(element.total_count.toString().trim()));
          pieSeries[0].data.push({name: element.hdr_name.toString().trim() , y: Number(element.total_count.toString().trim())});
          //working for pie-chart end

          //working for area-chart start
          areaSeries[0].name = item.table_name;
          areaSeries[0].data.push(Number(element.total_count.toString().trim()));
          areaCategories.categories.push(element.hdr_name.toString().trim());
          //working for area-chart end

        });
        this.chartOptions.xAxis = areaCategories;
        this.chartOptions.series = areaSeries;
        this.barchartOptions.xAxis = barCategories;
        this.barchartOptions.series = barSeries;
        this.barchartOptions.series = pieSeries;
        console.log("chartOptions " + this.chartOptions)
        console.log("barchartOptions " + this.barchartOptions)
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
      //position: 'relative',
      //,overflow: hidden,
      //,width: 111%;
      //,margin-top: 100px;
      //,height: 249px;
      //,text-align: left;
      //,margin-left: 9px;
      //,line-height: normal;
      //,z-index: 0;
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
  public index: number = 0;
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
