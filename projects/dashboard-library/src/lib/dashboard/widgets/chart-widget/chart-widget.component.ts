import { Component, DoCheck, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { DashboardCard } from '../../models/dashboard-card.model';
import * as Highcharts from 'highcharts';
import { WidgetService } from '../../_common-services/widget.service';
import { WidgetType } from '../../models/widget-type.model';
//import { Console } from 'console';

@Component({
  selector: 'lib-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.css']
})
export class ChartWidgetComponent implements DoCheck {

  constructor(private ref: ChangeDetectorRef) {
  }


  public queryParam: any;
  public _queryParams: any;
  public selectedWidgets: any;
  ngOnInit() {
    if (this.queryParam == null) {
      this._queryParams = (sessionStorage.getItem("queryParams") || '{}');
      this.queryParam = JSON.parse(this._queryParams);
      this.actualDashboarData = this.queryParam.data;
      this._queryParams = (sessionStorage.getItem("chartsValue") || '{}');
      this.queryParam = JSON.parse(this._queryParams);
      if (this.queryParam != null && this.queryParam != undefined) {
        this.selectedWidgets = this.queryParam.chartName;
      }
      this.allChartsData[0].chartOptions = this.chartOptions;
      this.allChartsData[1].chartOptions = this.barchartOptions;
      this.allChartsData[2].chartOptions = this.pieChartOptions;
      this.allChartsData.forEach(elmt => {
        elmt.chartOptions.isChecked = false;
      });
      this.getDashboardChartsData(this.queryParam.chartName);
    }
  }

  public actualDashboarData: any = [];

  getDashboardData = (data) => {
    //getDashboardData(data):void {
    this.actualDashboarData = data;
    this.chartOptions
    if (this.actualDashboarData != null && this.actualDashboarData != undefined) {
      let areaCategories: any = { categories: [] };
      let areaSeries: any = [{ data: [], name: "", type: undefined }]
      let barCategories: any = { categories: [] };
      let barSeries: any = [{ data: [], name: "", type: undefined }]
      let pieSeries: any = [{ data: [], name: "", type: undefined }]
      this.chartOptions.xAxis = areaCategories;
      this.chartOptions.series = areaSeries;
      this.barchartOptions.xAxis = barCategories;
      this.barchartOptions.series = barSeries;
      this.pieChartOptions.series = pieSeries;
      this.ref.detectChanges();
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
          pieSeries[0].data.push({ name: element.hdr_name.toString().trim(), y: Number(element.total_count.toString().trim()) });
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
        this.ref.detectChanges();
        //this.widgetSelected.emit(this.chart);
        console.log("chartOptions : ", this.chartOptions)
        console.log("barchartOptions : ", this.barchartOptions)
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
    }],
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

  // pieChartOptions: Highcharts.Options = {
  //   chart: {
  //     type: 'pie', // Set chart type to pie
  //     height: 100,
  //   },
  //   title: {
  //     text: 'Pie Chart'
  //   },
  //   xAxis: {
  //     categories: ['Pie X-Axis']
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   yAxis: {
  //     title: {
  //       text: 'Pie Y-Axis'
  //     }
  //   },
  //   plotOptions: {
  //     pie: {
  //       allowPointSelect: true,
  //       cursor: 'pointer',
  //       dataLabels: {
  //         enabled: true,
  //         format: '<b>{point.name}</b>: {point.percentage:.1f} %',
  //         connectorColor: 'silver'
  //       }
  //     }
  //   },
  //   series: [{
  //     name: 'Fruits', // Name of the series      
  //     type: 'pie',
  //     data: [
  //       { name: 'Apples', y: 19 }, // Data for each slice
  //       { name: 'Bananas', y: 34 },
  //       { name: 'Oranges', y: 46 }
  //     ]
  //   }],
  //   legend: {
  //     align: 'right',  // Align legends to the right
  //     verticalAlign: 'middle',  // Vertically align legends in the middle
  //     layout: 'vertical',  // Display legends in a vertical layout
  //     itemMarginBottom: 5  // Add some margin between legend items
  // }
  // };

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


  onWidgetRemoved(event) {
    this.widgetRemoved.emit(event);
  }

  ngDoCheck() {
    this.resize();
  }

  resize() {
    if (this.chart) {
      this.chart.reflow();
    }
  }


  onChartInstanceReceived(chart: Highcharts.Chart) {
    this.chart = chart;
  }


  public allChartsData: any = [
    { chartOptions: [] },
    { chartOptions: [] },
    { chartOptions: [] },
  ];

  getDashboardChartsData(chartName: any = "") {
    this.allChartsData.forEach(elmt => {
      let splitWidgets: any;
      let chartType: any;
      let areaCategories: any = { categories: [] };
      let areaSeries: any = [{ data: [], name: "", type: undefined }]
      let barCategories: any = { categories: [] };
      let barSeries: any = [{ data: [], name: "", type: undefined }]
      let pieSeries: any = [{ data: [], name: "", type: undefined }]
      if (elmt.chartOptions != null && elmt.chartOptions != undefined) {
        splitWidgets = this.selectedWidgets.split(elmt.chartOptions.title.text);
        splitWidgets = splitWidgets[0];
        chartType = this.selectedWidgets.split(splitWidgets);
        if (chartType != null && chartType != undefined && chartType.length > 1) {
          chartType = chartType[1];
        }
        if ((elmt.chartOptions.title.text).toLowerCase() == /*"area chart"*/ chartType.toLowerCase() && chartType.toLowerCase() == "area chart") {
          //if ((elmt.chartOptions.title.text).toLowerCase().indexOf('area chart') !== -1) {
          //if ((chartName).toLowerCase() == "area chart") {
          elmt.chartOptions.xAxis = areaCategories;
          elmt.chartOptions.series = areaSeries;
          let item: any = [];
          let currentTabData: any = [];
          let isCheckedWidgets: any = [];
          //let splitWidgets = this.selectedWidgets.split(/area chart/i);
          let splitWidgets = this.selectedWidgets.split(elmt.chartOptions.title.text);
          splitWidgets = splitWidgets[0];
          console.log(splitWidgets);
          isCheckedWidgets = this.actualDashboarData.dashboardDetailDataRead.filter(x => (x.table_name).indexOf(splitWidgets) !== -1)
          if (isCheckedWidgets != null && isCheckedWidgets != undefined && isCheckedWidgets.length > 0) {
            item = isCheckedWidgets[0];
            //item = this.actualDashboarData.dashboardDetailDataRead[0];
            currentTabData = this.actualDashboarData.dashboardDetailItemDataRead.filter((y: any) => y.table_id == item.id);
            if (currentTabData != null && currentTabData != undefined && currentTabData.length > 0) {
              currentTabData.forEach((element: any, i) => {
                //working for area-chart start
                areaSeries[0].name = item.table_name;
                areaSeries[0].data.push(Number(element.total_count.toString().trim()));
                areaCategories.categories.push(element.hdr_name.toString().trim());
                //working for area-chart end  
              });
              elmt.chartOptions.title.text = this.selectedWidgets;
              elmt.chartOptions.xAxis = areaCategories;
              elmt.chartOptions.series = areaSeries;
              elmt.chartOptions.isChecked = true //(chartName).toLowerCase() == "area chart"; //true //
            }
          }
        }
        else if ((elmt.chartOptions.title.text).toLowerCase() == /*"bar chart"*/ chartType.toLowerCase() && chartType.toLowerCase() == "bar chart") {
          //else if ((chartName).toLowerCase() == "bar chart") {
          elmt.chartOptions.xAxis = barCategories;
          elmt.chartOptions.series = barSeries;
          let item: any = [];
          let currentTabData: any = [];
          let isCheckedWidgets: any = [];
          let splitWidgets = this.selectedWidgets.split(elmt.chartOptions.title.text);
          splitWidgets = splitWidgets[0];
          isCheckedWidgets = this.actualDashboarData.dashboardDetailDataRead.filter(x => (x.table_name).indexOf(splitWidgets) !== -1)
          item = isCheckedWidgets[0];
          //item = this.actualDashboarData.dashboardDetailDataRead[0];
          currentTabData = this.actualDashboarData.dashboardDetailItemDataRead.filter((y: any) => y.table_id == item.id);
          if (currentTabData != null && currentTabData != undefined && currentTabData.length > 0) {
            currentTabData.forEach((element: any, i) => {
              //working for bar-chart start
              barSeries[0].name = item.table_name;
              barSeries[0].data.push(Number(element.total_count.toString().trim()));
              barCategories.categories.push(element.hdr_name.toString().trim());
              //working for bar-chart end
            });
            elmt.chartOptions.title.text = this.selectedWidgets;
            elmt.chartOptions.xAxis = barCategories;
            elmt.chartOptions.series = barSeries;
            elmt.chartOptions.isChecked = true //(chartName).toLowerCase() == "bar chart"; //true
          }
        }
        else if ((elmt.chartOptions.title.text).toLowerCase() == /*"pie chart"*/ chartType.toLowerCase() && chartType.toLowerCase() == "pie chart") {
          //else if ((chartName).toLowerCase() == "pie chart") {
          elmt.chartOptions.series = pieSeries;
          let item: any = [];
          let currentTabData: any = [];
          let isCheckedWidgets: any = [];
          let splitWidgets = this.selectedWidgets.split(elmt.chartOptions.title.text);
          splitWidgets = splitWidgets[0];
          isCheckedWidgets = this.actualDashboarData.dashboardDetailDataRead.filter(x => (x.table_name).indexOf(splitWidgets) !== -1)
          item = isCheckedWidgets[0];
          //item = this.actualDashboarData.dashboardDetailDataRead[0];
          currentTabData = this.actualDashboarData.dashboardDetailItemDataRead.filter((y: any) => y.table_id == item.id);
          if (currentTabData != null && currentTabData != undefined && currentTabData.length > 0) {
            currentTabData.forEach((element: any, i) => {
              //working for pie-chart start
              pieSeries[0].name = item.table_name;
              //pieSeries[0].data.push(Number(element.total_count.toString().trim()));
              pieSeries[0].data.push({ name: element.hdr_name.toString().trim(), y: Number(element.total_count.toString().trim()) });
              //working for pie-chart end
            });
            elmt.chartOptions.title.text = this.selectedWidgets;
            elmt.chartOptions.series = pieSeries;
            elmt.chartOptions.isChecked = true //(chartName).toLowerCase() == "pie chart"; //true
          }
        }
      }
    });
    console.log(this.allChartsData);
    // if (this.actualDashboarData != null && this.actualDashboarData != undefined) {
    //   let areaCategories: any = { categories: [] };
    //   let areaSeries: any = [{ data: [], name: "", type: undefined }]
    //   let barCategories: any = { categories: [] };
    //   let barSeries: any = [{ data: [], name: "", type: undefined }]
    //   let pieSeries: any = [{ data: [], name: "", type: undefined }]
    //   this.chartOptions.xAxis = areaCategories;
    //   this.chartOptions.series = areaSeries;
    //   this.barchartOptions.xAxis = barCategories;
    //   this.barchartOptions.series = barSeries;
    //   this.pieChartOptions.series = pieSeries;
    //   this.ref.detectChanges();
    //   let item: any = [];
    //   let currentTabData: any = [];
    //   //item = this.actualDashboarData.dashboardDetailDataRead.filter((x: any) => x.id == this.tabID);
    //   item = this.actualDashboarData.dashboardDetailDataRead[0];
    //   //currentTabData = this.actualDashboarData.dashboardDetailItemDataRead.filter((y: any) => y.table_id == this.tabID);
    //   currentTabData = this.actualDashboarData.dashboardDetailItemDataRead.filter((y: any) => y.table_id == item.id);
    //   if (currentTabData != null && currentTabData != undefined && currentTabData.length > 0) {
    //     currentTabData.forEach((element: any, i) => {
    //       //working for bar-chart start
    //       barSeries[0].name = item.table_name;
    //       barSeries[0].data.push(Number(element.total_count.toString().trim()));
    //       barCategories.categories.push(element.hdr_name.toString().trim());
    //       //working for bar-chart end

    //       //working for pie-chart start
    //       pieSeries[0].name = item.table_name;
    //       //pieSeries[0].data.push(Number(element.total_count.toString().trim()));
    //       pieSeries[0].data.push({ name: element.hdr_name.toString().trim(), y: Number(element.total_count.toString().trim()) });
    //       //working for pie-chart end

    //       //working for area-chart start
    //       areaSeries[0].name = item.table_name;
    //       areaSeries[0].data.push(Number(element.total_count.toString().trim()));
    //       areaCategories.categories.push(element.hdr_name.toString().trim());
    //       //working for area-chart end

    //     });
    //     this.chartOptions.xAxis = areaCategories;
    //     this.chartOptions.series = areaSeries;
    //     this.barchartOptions.xAxis = barCategories;
    //     this.barchartOptions.series = barSeries;
    //     this.barchartOptions.series = pieSeries;
    //     this.ref.detectChanges();
    //     //this.widgetSelected.emit(this.chart);
    //     console.log("chartOptions : ", this.chartOptions)
    //     console.log("barchartOptions : ", this.barchartOptions)
    //   }
    // }
  }


}
