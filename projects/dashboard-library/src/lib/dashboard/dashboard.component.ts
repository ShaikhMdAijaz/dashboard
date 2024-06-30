import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GridsterConfig, GridType, CompactType, DisplayGrid, GridsterComponent } from 'angular-gridster2';
import { DashboardCard } from './models/dashboard-card.model';
import { ChartWidgetComponent } from './widgets/chart-widget/chart-widget.component';
import { WidgetType } from './models/widget-type.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ChartWidgetComponent } from './chart-widget/chart-widget.component';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {
  }
  @Input() widgetTypes: WidgetType[] = [
    {
      componentName: 'ChartWidgetComponent1',
      component: ChartWidgetComponent,
      id: 0,
      widget_id: 1,
      widgetSettings: {
        widgetTitle: 'Area Chart'
      },
      //cards : this.cards,
      description: 'Chart example for the demo.',
      checked: false,
      //module: 'SOC',
      module: 'Area Chart',
      thumbnailUrl: 'assets/images/widget-thumbnails/area.png',
      placement: {
        x: 1,
        y: 1,
        rows: 5,
        cols: 2,
        minItemRows: 2,
        maxItemRows: 10,
        minItemCols: 2,
        maxItemCols: 3
      }
    },
    {
      componentName: 'ChartWidgetComponent2',
      component: ChartWidgetComponent,
      id: 0,
      widget_id: 2,
      widgetSettings: {
        widgetTitle: 'Bar Chart'
      },
      description: 'Chart example for the demo.',
      checked: false,
      //module: 'SOC',
      module: 'Bar Chart',
      thumbnailUrl: 'assets/images/widget-thumbnails/barChart.png',
      placement: {
        x: 2,
        y: 2,
        rows: 5,
        cols: 2,
        minItemRows: 2,
        maxItemRows: 10,
        minItemCols: 2,
        maxItemCols: 3
      }
    },
    {
      componentName: 'ChartWidgetComponent3',
      component: ChartWidgetComponent,
      id: 0,
      widget_id: 3,
      widgetSettings: {
        widgetTitle: 'Pie Chart'
      },
      description: 'Chart example for the demo.',
      checked: false,
      //module: 'SOC',
      module: 'Pie Chart',
      thumbnailUrl: 'assets/images/widget-thumbnails/pie.jpeg',
      placement: {
        x: 3,
        y: 3,
        rows: 5,
        cols: 2,
        minItemRows: 3,
        maxItemRows: 7,
        minItemCols: 2,
        maxItemCols: 3
      }
    }
  ];

  @ViewChild('dashboardgrid', { static: false })
  dashboardGrid: GridsterComponent;

  widgetMenuOpened = false;
  widgetMenuOpenedBeforeDrag: boolean;


  widgetEvents = {
    //widgetRemoved: (card: DashboardCard) => {
    widgetRemoved: (chartName) => {
      // const index = this.cards.indexOf(card);
      // if (index >= 0) {
      //   this.cards.splice(index, 1);
      // }
      this.cards = this.cards.filter(x => x.widgetSettings.widgetTitle != chartName);
      this.widgetTypes.forEach(elmt => {
        //if (elmt.module == card.widgetSettings.widgetTitle) {
        if (elmt.module == chartName) {
          elmt.checked = false;
        }
      });
      console.log("Cancelcards : ", this.cards);
    }
  };

  onChangeWidgetEvents(chartName) {
    this.cards = this.cards.filter(x => x.widgetSettings.widgetTitle != chartName);
    this.widgetTypes.forEach(elmt => {
      if (elmt.module == chartName) {
        elmt.checked = false;
      }
    });
    console.log("unChkdcards : ", this.cards);
  }

  options: GridsterConfig;

  cards: DashboardCard[] = [];

  ngOnInit() {
    this.get_dashboard_data();
    //this.get_dashboard_details();
    this.options = {
      gridType: GridType.VerticalFixed,
      fixedRowHeight: 50,
      compactType: CompactType.None,
      minCols: 10,
      maxCols: 10,
      minRows: 12,
      maxRows: 50,
      displayGrid: DisplayGrid.Always,
      pushItems: true,
      draggable: {
        enabled: true,
        start: () => {
          this.widgetMenuOpenedBeforeDrag = this.widgetMenuOpened;
          this.widgetMenuOpened = false;
        },
        stop: () => {
          this.widgetMenuOpened = this.widgetMenuOpenedBeforeDrag;
        }
      },
      resizable: {
        enabled: true
      },
      emptyCellDropCallback: this.onWidgetDrop.bind(this),
      enableEmptyCellDrop: true
    };
    console.log("Options: ", this.options);
  }

  //public dashboardGraphData: any = [];
  public dashboardGraphData: any = {
    "dashboardDetailDataRead": [
      {
        "id": 1,
        "table_name": "INWARD DATA "
      },
      {
        "id": 2,
        "table_name": "OUTWARD DATA "
      },
      {
        "id": 3,
        "table_name": "STOCK DATA "
      }
    ],
    "dashboardDetailItemDataRead": [
      {
        "table_id": 1,
        "hdr_name": "DRAFT ASN",
        "total_count": 0,
        "seq_no": 1,
        "icon_name": "icon feather icon-eye text_c_green mb-1 d-block",
        "background": "#ed7d31",
        "event_code": "div_draft_asn",
        "percent": null
      },
      {
        "table_id": 1,
        "hdr_name": "UNLOADING PENDING",
        "total_count": 0,
        "seq_no": 2,
        "icon_name": "icon feather icon-eye text_c_green mb-1 d-block",
        "background": "#ed7d31",
        "event_code": "div_unloading_pending",
        "percent": null
      },
      {
        "table_id": 1,
        "hdr_name": "GRN PENDING",
        "total_count": 0,
        "seq_no": 3,
        "icon_name": "icon feather icon-eye text_c_green mb-1 d-block",
        "background": "#ed7d31",
        "event_code": "div_grn_pending",
        "percent": null
      },
      {
        "table_id": 1,
        "hdr_name": "PUTAWAY PENDING",
        "total_count": 0,
        "seq_no": 4,
        "icon_name": "assets/images/Putaway_2.png",
        "background": "#ed7d31",
        "event_code": "div_putaway_pending",
        "percent": null
      },
      {
        "table_id": 1,
        "hdr_name": "PUTAWAY IN-PROCESS",
        "total_count": 0,
        "seq_no": 5,
        "icon_name": "assets/images/Putaway_2.png",
        "background": "#ed7d31",
        "event_code": "div_putaway_inprocess",
        "percent": null
      },
      {
        "table_id": 1,
        "hdr_name": "SALES RETURN PENDING",
        "total_count": 0,
        "seq_no": 6,
        "icon_name": "icon feather icon-eye text_c_green mb-1 d-block",
        "background": "#ed7d31",
        "event_code": "div_salesreturn_pending",
        "percent": null
      },
      {
        "table_id": 2,
        "hdr_name": "DRAFT SO",
        "total_count": 0,
        "seq_no": 7,
        "icon_name": "icon feather icon-eye text_c_green mb-1 d-block",
        "background": "#11a261",
        "event_code": "div_draft_so",
        "percent": null
      },
      {
        "table_id": 2,
        "hdr_name": "PICKING PENDING",
        "total_count": 0,
        "seq_no": 8,
        "icon_name": "assets/images/Picking_2.png",
        "background": "#11a261",
        "event_code": "div_picking_pending",
        "percent": null
      },
      {
        "table_id": 2,
        "hdr_name": "PICKING IN-PROCESS",
        "total_count": 0,
        "seq_no": 9,
        "icon_name": "assets/images/Picking_2.png",
        "background": "#11a261",
        "event_code": "div_picking_inprocess",
        "percent": null
      },
      {
        "table_id": 2,
        "hdr_name": "PACKING PENDING",
        "total_count": 0,
        "seq_no": 10,
        "icon_name": "assets/images/Pending_Packing1.png",
        "background": "#11a261",
        "event_code": "div_packing_pending",
        "percent": null
      },
      {
        "table_id": 2,
        "hdr_name": "PACKING IN-PROCESS",
        "total_count": 0,
        "seq_no": 11,
        "icon_name": "assets/images/Pending_Packing1.png",
        "background": "#11a261",
        "event_code": "div_packing_inprocess",
        "percent": null
      },
      {
        "table_id": 2,
        "hdr_name": "DISPATCH PENDING",
        "total_count": 0,
        "seq_no": 12,
        "icon_name": "icon feather icon-eye text_c_green mb-1 d-block",
        "background": "#11a261",
        "event_code": "div_dispatch_pending",
        "percent": null
      },
      {
        "table_id": 3,
        "hdr_name": "SALABLE STOCK",
        "total_count": 0,
        "seq_no": 14,
        "icon_name": "icon feather icon-eye text_c_green mb-1 d-block",
        "background": "#5ba5dd",
        "event_code": "div_saleable_stock",
        "percent": null
      },
      {
        "table_id": 3,
        "hdr_name": "DAMAGE STOCK",
        "total_count": 0,
        "seq_no": 15,
        "icon_name": "icon feather icon-eye text_c_green mb-1 d-block",
        "background": "#5ba5dd",
        "event_code": "div_damage_stock",
        "percent": null
      },
      {
        "table_id": 3,
        "hdr_name": "NEAR EXPIRY STOCK",
        "total_count": 0,
        "seq_no": 16,
        "icon_name": "icon feather icon-eye text_c_green mb-1 d-block",
        "background": "#5ba5dd",
        "event_code": "div_near_expiry_stock",
        "percent": null
      },
      {
        "table_id": 3,
        "hdr_name": "EXPIRED STOCK",
        "total_count": 0,
        "seq_no": 17,
        "icon_name": "icon feather icon-eye text_c_green mb-1 d-block",
        "background": "#5ba5dd",
        "event_code": "div_expired_stock",
        "percent": null
      }
    ]
  };
  private headers: HttpHeaders;
  private option: any;
  get_dashboard_data() {
    //let header;
    //header = {
    //  "X-Requested-With": "XMLHttpRequest",
    //  "Authorization": "Bearer " + this.bearerToken
    //};
    //this.headers = new HttpHeaders(header);
    //this.option = { headers: this.headers };
    ////this.httpServices.request('get', 'analytics/dashboard/details', '', '', null)
    //this.http.get('http://192.168.3.14:3000/api/analytics/dashboard/details?account_id=1&warehouse_id=11', this.option).subscribe(data => {
      //if (data) {
        //this.dashboardGraphData = [];
        //this.dashboardGraphData = data;
        //this.dashboardGraphData = this.dashboardGraphData.data;
        let passQueryParam = { data: this.dashboardGraphData };
        sessionStorage.setItem("queryParams", JSON.stringify(passQueryParam));
        if (this.dashboardGraphData != null && this.dashboardGraphData != undefined) {
          this.dashboardGraphData.dashboardDetailDataRead.forEach(elmt => {
            let areaChartWidgets: any = [];
            areaChartWidgets = this.widgetTypes.filter(x => x.module == 'Area Chart');
            areaChartWidgets = JSON.parse(JSON.stringify(areaChartWidgets));
            if (areaChartWidgets != null && areaChartWidgets != undefined && areaChartWidgets.length > 0) {
              //areaChartWidgets[0].id = elmt.id;
              areaChartWidgets[0].widget_id = elmt.id;
              areaChartWidgets[0].module = elmt.table_name + areaChartWidgets[0].module;
              areaChartWidgets[0].widgetSettings.widgetTitle = areaChartWidgets[0].module;
              areaChartWidgets[0].component = ChartWidgetComponent;
              this.widgetTypes.push(areaChartWidgets[0]);
            }
          });
          this.dashboardGraphData.dashboardDetailDataRead.forEach(elmt => {
            let barChartWidgets: any = [];
            barChartWidgets = this.widgetTypes.filter(x => x.module == 'Bar Chart');
            barChartWidgets = JSON.parse(JSON.stringify(barChartWidgets));
            if (barChartWidgets != null && barChartWidgets != undefined && barChartWidgets.length > 0) {
              //barChartWidgets[0].id = elmt.id;
              barChartWidgets[0].widget_id = elmt.id;
              barChartWidgets[0].module = elmt.table_name + barChartWidgets[0].module;
              barChartWidgets[0].widgetSettings.widgetTitle = barChartWidgets[0].module;
              barChartWidgets[0].component = ChartWidgetComponent;
              this.widgetTypes.push(barChartWidgets[0]);
            }
          });
          this.dashboardGraphData.dashboardDetailDataRead.forEach(elmt => {
            let pieChartWidgets: any = [];
            pieChartWidgets = this.widgetTypes.filter(x => x.module == 'Pie Chart');
            pieChartWidgets = JSON.parse(JSON.stringify(pieChartWidgets));
            if (pieChartWidgets != null && pieChartWidgets != undefined && pieChartWidgets.length > 0) {
              //pieChartWidgets[0].id = elmt.id;
              pieChartWidgets[0].widget_id = elmt.id;
              pieChartWidgets[0].module = elmt.table_name + pieChartWidgets[0].module;
              pieChartWidgets[0].widgetSettings.widgetTitle = pieChartWidgets[0].module;
              pieChartWidgets[0].component = ChartWidgetComponent;
              this.widgetTypes.push(pieChartWidgets[0]);
            }
          });
          this.widgetTypes = this.widgetTypes.filter(x => x.module != 'Area Chart' && x.module != 'Bar Chart' && x.module != 'Pie Chart');
          this.get_dashboard_details();
        }
      //}
    //});
  }

  public dashboardChartsData: any = [];
  get_dashboard_details() {
    let body = {
      role_id: 6,
      account_id: 1,
      company_id: 1,
      user_id: 139
    }
    let header;
    header = {
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": "Bearer " + this.bearerToken
    };
    this.headers = new HttpHeaders(header);
    this.option = { headers: this.headers };
    this.http.post('http://192.168.3.14:3000/api/security/widgets/get', body, this.option).subscribe(data => {
      //console.log(data);
      this.dashboardChartsData = data;
      this.dashboardChartsData = this.dashboardChartsData.data;
      console.log("dashboardChartsData: ", this.dashboardChartsData);
      console.log("widgetTypes: ", this.widgetTypes);
      if (this.dashboardChartsData != null && this.dashboardChartsData != undefined && this.dashboardChartsData.length > 0) {
        this.dashboardChartsData.forEach(elmt => {
          if ((elmt.chart_type).toLowerCase() == 'area chart') {
            let areaChartWidgets: any = [];
            areaChartWidgets = this.widgetTypes.filter(x => x.module == 'Area Chart');
            areaChartWidgets = JSON.parse(JSON.stringify(areaChartWidgets));
            if (areaChartWidgets != null && areaChartWidgets != undefined && areaChartWidgets.length > 0) {
              areaChartWidgets[0].id = elmt.id == null ? 0 : elmt.id;
              areaChartWidgets[0].widget_id = elmt.widget_id;
              areaChartWidgets[0].module = elmt.widget_name + ' ' + areaChartWidgets[0].module;
              areaChartWidgets[0].widgetSettings.widgetTitle = areaChartWidgets[0].module;
              areaChartWidgets[0].component = ChartWidgetComponent;
              this.widgetTypes.push(areaChartWidgets[0]);
            }
          }
          else if ((elmt.chart_type).toLowerCase() == 'bar chart') {
            let barChartWidgets: any = [];
            barChartWidgets = this.widgetTypes.filter(x => x.module == 'Bar Chart');
            barChartWidgets = JSON.parse(JSON.stringify(barChartWidgets));
            if (barChartWidgets != null && barChartWidgets != undefined && barChartWidgets.length > 0) {
              barChartWidgets[0].id = elmt.id == null ? 0 : elmt.id;
              barChartWidgets[0].widget_id = elmt.widget_id;
              barChartWidgets[0].module = elmt.widget_name + ' ' + barChartWidgets[0].module;
              barChartWidgets[0].widgetSettings.widgetTitle = barChartWidgets[0].module;
              barChartWidgets[0].component = ChartWidgetComponent;
              this.widgetTypes.push(barChartWidgets[0]);
            }
          }
          else if ((elmt.chart_type).toLowerCase() == 'pie chart') {
            let pieChartWidgets: any = [];
            pieChartWidgets = this.widgetTypes.filter(x => x.module == 'Pie Chart');
            pieChartWidgets = JSON.parse(JSON.stringify(pieChartWidgets));
            if (pieChartWidgets != null && pieChartWidgets != undefined && pieChartWidgets.length > 0) {
              pieChartWidgets[0].id = elmt.id == null ? 0 : elmt.id;
              pieChartWidgets[0].widget_id = elmt.widget_id;
              pieChartWidgets[0].module = elmt.widget_name + ' ' + pieChartWidgets[0].module;
              pieChartWidgets[0].widgetSettings.widgetTitle = pieChartWidgets[0].module;
              pieChartWidgets[0].component = ChartWidgetComponent;
              this.widgetTypes.push(pieChartWidgets[0]);
            }
          }
        });
        this.widgetTypes = this.widgetTypes.filter(x => x.module != 'Area Chart' && x.module != 'Bar Chart' && x.module != 'Pie Chart');
        this.dashboardChartsData.forEach(x => {
          this.widgetTypes.forEach(y => {
            if (x.widget_id == y.widget_id && x.id > 0) {
              //if (((y.module).toLowerCase().indexOf((x.chart_type).toLowerCase()) !== -1)) {
              let passQueryParam = { chartName: y.module };
              sessionStorage.setItem("chartsValue", JSON.stringify(passQueryParam));
              y.id = x.id;
              y.widget_id = x.widget_id;
              y.checked = true;
              y.placement.x = x.pos_x1;
              y.placement.y = x.pos_y1;
              y.placement.rows = x.pos_x2;
              y.placement.cols = x.pos_y2;
              this.onWidgetTypeClicked(y);
              //}
            }
          });
        });
      }
    });
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  onWidgetDrop(event: MouseEvent, item: any) {
    const { x, y } = this.getDashboardWidgetPosition(event);
    const card = this.CreateCard(x, y, this.currentDraggableWidgetType);

    this.addCard(card);
  }

  private getDashboardWidgetPosition($event: any) {
    const rect = this.dashboardGrid.el.getBoundingClientRect();

    const dashboardMargin = this.dashboardGrid.$options.margin;

    const calculatedX = $event.clientX + this.dashboardGrid.el.scrollLeft - rect.left - dashboardMargin;
    const calculatedY = $event.clientY + this.dashboardGrid.el.scrollTop - rect.top - dashboardMargin;

    const x = this.dashboardGrid.pixelsToPositionX(calculatedX, Math.floor);
    const y = this.dashboardGrid.pixelsToPositionY(calculatedY, Math.floor);

    return { x, y };
  }

  // addItem() {
  //   this.cards.push(new DashboardCard({
  //     widgetSettings: {
  //       widgetTitle: 'Chart example',
  //       chartData: this.dashboardGraphData
  //     },
  //     component: ChartWidgetComponent,
  //     componentName: 'ChartWidgetComponent',
  //     placement: {
  //       y: 0,
  //       x: 0,
  //       rows: 4,
  //       cols: 4,
  //       minItemRows: 3,
  //       maxItemRows: 10,
  //       minItemCols: 3,
  //       maxItemCols: 10
  //     }
  //   }));
  // }

  cleanDashboard() {
    this.cards = [];
    this.widgetTypes.forEach(x => {
      x.checked = false;
    });
  }

  showWidgetsPanel() {
    this.widgetMenuOpened = true;
  }

  hideWidgetsPanel() {
    this.widgetMenuOpened = false;
  }

  onWidgetTypeClicked(widgetType: WidgetType) {
    if (widgetType.id == 0) {
      const card = this.CreateCard(0, 0, widgetType);
      this.addCard(card);
    }
    else if (widgetType.id > 0) {
      const card = this.CreateCard(widgetType.placement.x, widgetType.placement.y, widgetType);
      this.addCard(card);
    }
  }

  private CreateCard(x: number, y: number, widgetType: WidgetType) {
    const card = new DashboardCard({
      id: widgetType.id,
      widget_id: widgetType.widget_id,
      component: widgetType.component,
      componentName: widgetType.componentName,
      widgetSettings: JSON.parse(JSON.stringify(widgetType.widgetSettings)),
      placement: JSON.parse(JSON.stringify(widgetType.placement))
    });

    card.placement.x = x;
    card.placement.y = y;

    return card;
  }

  onAddWidgets(data) {
    this.cards.push(data);
  }

  private currentDraggableWidgetType: WidgetType;

  addCard(card: DashboardCard): void {
    let newCard: any = [];
    newCard = this.cards;
    this.cards = [];
    this.cards.push(card);
    if (newCard.length > 0) {
      newCard.forEach(element => {
        this.cards.push(element);
      });
    }
    //this.cards = JSON.parse(JSON.stringify(this.cards))
    console.log("cards : ", this.cards);
    // if(this.cards.length==1){
    //   this.cards[0].placement.x = 0;
    //   this.cards[0].placement.rows = 4;
    //   this.cards[0].placement.cols = 2;
    // }
    // else if(this.cards.length==2){
    //   this.cards[0].placement.x = 3;
    //   this.cards[0].placement.rows = 6;
    //   this.cards[0].placement.cols = 2;
    // }
    // else if(this.cards.length==3){
    //   this.cards[0].placement.x = 6;
    //   this.cards[0].placement.rows = 8;
    //   this.cards[0].placement.cols = 3;
    // }
    // else if(this.cards.length==4){
    //   this.cards[0].placement.x = 1;
    //   this.cards[0].placement.y = 6;
    //   this.cards[0].placement.rows = 5;
    //   this.cards[0].placement.cols = 2;
    // }
    this.ref.detectChanges();
  }

  onDragstart(widgetType: WidgetType) {
    widgetType.checked = true;
    this.options.maxItemCols = widgetType.placement.maxItemCols;
    this.options.minItemCols = widgetType.placement.minItemCols;
    this.options.maxItemRows = widgetType.placement.maxItemRows;
    this.options.minItemRows = widgetType.placement.minItemRows;
    this.options.defaultItemCols = widgetType.placement.cols;
    this.options.defaultItemRows = widgetType.placement.rows;

    this.changedOptions();

    this.currentDraggableWidgetType = widgetType;
  }

  public userAuthInfo: any = {
    default_account_id: 1,
    default_company_id: 1,
    default_role_id: 6,
    user_id: 139
  }
  public bearerToken: any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoie1widXNlcl9pZFwiOjIxOCxcInVpZFwiOlwiYzM2MTQ3NWYtYTFkZC00NDM4LWIyYzQtNmFiNDFkYzkyZjk5XCIsXCJzaG9ydG5hbWVcIjpcIkFpamF6IFNrXCIsXCJuYW1lXCI6XCJBaWphelwiLFwiZGVzY3JpcHRpb25cIjpcIlwiLFwiZW1haWxfYWRkcmVzc1wiOlwiYXpAeW9wbWFpbC5jb21cIixcIm1vYmlsZV9ub1wiOlwiOTg3OTg3OTg3MFwiLFwiZG9iXCI6XCIxOTk4LTEyLTMxXCIsXCJ0b2tlblwiOm51bGwsXCJkZWZhdWx0X3JvbGVfaWRcIjozLFwiZGVmYXVsdF9hY2NvdW50X2lkXCI6MSxcImRlZmF1bHRfd2FyZWhvdXNlX2lkXCI6MTEsXCJkZWZhdWx0X2NvbXBhbnlfaWRcIjoxLFwiY29tcGFueV91aWRcIjpudWxsLFwiY29tcGFueV9uYW1lXCI6bnVsbCxcImNvbXBhbnlfY29kZVwiOm51bGwsXCJkZWZhdWx0X2FjY291bnRfbmFtZVwiOm51bGwsXCJkZWZhdWx0X2FjY291bnRfY29kZVwiOm51bGwsXCJkZWZhdWx0X3dhcmVob3VzZV9uYW1lXCI6bnVsbCxcImRlZmF1bHRfd2FyZWhvdXNlX2NvZGVcIjpudWxsLFwiZGVmYXVsdF9hY2NvdW50X3VpZFwiOm51bGwsXCJkZWZhdWx0X3dhcmVob3VzZV91aWRcIjpudWxsLFwidXNlcl9yb2xlc1wiOm51bGwsXCJ1c2VyX21vZHVsZV9hY2Nlc3NcIjpudWxsLFwidXNlcl9jb21tb25fc2VhcmNoX21vZHVsZVwiOm51bGwsXCJxdWlja0FkZE1vZHVsZXNcIjpudWxsLFwidXNlcl9kYXRhX2FjY2Vzc1wiOm51bGwsXCJhY2NvdW50X2F0dHJpYnV0ZVwiOm51bGwsXCJwYXNzd29yZFwiOm51bGwsXCJjbGllbnRfZGF0ZV9mb3JtYXRcIjpudWxsLFwic2VydmVyX2RhdGVfZm9ybWF0XCI6bnVsbH0iLCJuYmYiOjE3MTc2NjUyODcsImV4cCI6MTcxODI3MDA4NywiaWF0IjoxNzE3NjY1Mjg3fQ.jhisIy9Mto_7tJyq1Lpneg6I1owXEz1JLUaz2vbTQJo'
  onSaveCharts() {
    if (this.cards != null && this.cards != undefined && this.cards.length > 0) {
      let header;
      header = {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Bearer " + this.bearerToken
      };
      this.headers = new HttpHeaders(header);
      this.option = { headers: this.headers };
      let body: any = [{
        created_by_id: 0,
        created_user: "",
        created_date: null,
        modified_by_id: 0,
        modified_user: "",
        modified_date: null,
        deleted_by_id: 0,
        deleted_user: "",
        deleted_date: null,
        id: 0,
        uid: "",
        widget_id: 0,
        role_id: 0,
        account_id: 0,
        company_id: 0,
        user_id: 0,
        pos_x1: 0,
        pos_y1: 0,
        pos_x2: 0,
        pos_y2: 0,
        status_id: 0
      }]
      this.cards.forEach(x => {
        body.push({
          id: x.id,
          uid: "",
          widget_id: x.widget_id,
          role_id: this.userAuthInfo.default_role_id,
          account_id: this.userAuthInfo.default_account_id,
          company_id: this.userAuthInfo.default_company_id,
          user_id: this.userAuthInfo.user_id,
          pos_x1: x.placement.x,
          pos_y1: x.placement.y,
          pos_x2: x.placement.rows,
          pos_y2: x.placement.cols,
          created_by_id: 0,
          created_user: "",
          created_date: null,
          modified_by_id: 0,
          modified_user: "",
          modified_date: null,
          deleted_by_id: 0,
          deleted_user: "",
          deleted_date: null,
        });
      });
      body = body.filter(x => x.widget_id > 0);
      console.log("body :", body);
      //this.http.get('http://192.168.3.14:3000/api/analytics/dashboard/details', this.option).subscribe(data => {
      this.http.post('http://192.168.3.14:3000/api/security/widgets', body, this.option).subscribe(data => {
        //this.http.request('post', 'common/city', '', '', body).subscribe(data => {
        //if (data.status_code == 200) {
        //}
      });
    }
    // else if(this.cards == null || this.cards == undefined || this.cards.length==0){

    // }
  }
}
