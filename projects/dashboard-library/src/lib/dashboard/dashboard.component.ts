import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GridsterConfig, GridType, CompactType, DisplayGrid, GridsterComponent } from 'angular-gridster2';
import { DashboardCard } from './models/dashboard-card.model';
import { ChartWidgetComponent } from './widgets/chart-widget/chart-widget.component';
import { WidgetType } from './models/widget-type.model';
import { WidgetService } from './_common-services/widget.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input()
  widgetTypes: WidgetType[] = [
    {
      componentName: 'ChartWidgetComponent1',
      component: ChartWidgetComponent,
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
        minItemRows: 2,
        maxItemRows: 10,
        minItemCols: 2,
        maxItemCols: 3
      }
    }
  ];

  @ViewChild('dashboardgrid', { static: false })
  dashboardGrid: GridsterComponent;

  widgetMenuOpened = false;
  widgetMenuOpenedBeforeDrag: boolean;

  constructor(private widgetService: WidgetService, private http: HttpClient) {
  }

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
      this.widgetService.widgetsChartName.next(chartName);
    }
  };

  onChangeWidgetEvents(chartName) {
    this.cards = this.cards.filter(x => x.widgetSettings.widgetTitle != chartName);
    this.widgetTypes.forEach(elmt => {
      if (elmt.module == chartName) {
        elmt.checked = false;
      }
    });
    this.widgetService.widgetsChartName.next(chartName);
  }

  options: GridsterConfig;

  cards: DashboardCard[] = [];

  ngOnInit() {
    this.get_dashboard_data();
    this.widgetService.widgetsChartName.next("");
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
  }


  public dashboardGraphData: any = [];
  private headers: HttpHeaders;
  private option: any;
  get_dashboard_data() {
    let header;
    header = {
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoie1widXNlcl9pZFwiOjIxOCxcInVpZFwiOlwiYzM2MTQ3NWYtYTFkZC00NDM4LWIyYzQtNmFiNDFkYzkyZjk5XCIsXCJzaG9ydG5hbWVcIjpcIkFpamF6IFNrXCIsXCJuYW1lXCI6XCJBaWphelwiLFwiZGVzY3JpcHRpb25cIjpcIlwiLFwiZW1haWxfYWRkcmVzc1wiOlwiYXpAeW9wbWFpbC5jb21cIixcIm1vYmlsZV9ub1wiOlwiOTg3OTg3OTg3MFwiLFwiZG9iXCI6XCIxOTk4LTEyLTMxXCIsXCJ0b2tlblwiOm51bGwsXCJkZWZhdWx0X3JvbGVfaWRcIjozLFwiZGVmYXVsdF9hY2NvdW50X2lkXCI6MSxcImRlZmF1bHRfd2FyZWhvdXNlX2lkXCI6MTEsXCJkZWZhdWx0X2NvbXBhbnlfaWRcIjoxLFwiY29tcGFueV91aWRcIjpudWxsLFwiY29tcGFueV9uYW1lXCI6bnVsbCxcImNvbXBhbnlfY29kZVwiOm51bGwsXCJkZWZhdWx0X2FjY291bnRfbmFtZVwiOm51bGwsXCJkZWZhdWx0X2FjY291bnRfY29kZVwiOm51bGwsXCJkZWZhdWx0X3dhcmVob3VzZV9uYW1lXCI6bnVsbCxcImRlZmF1bHRfd2FyZWhvdXNlX2NvZGVcIjpudWxsLFwiZGVmYXVsdF9hY2NvdW50X3VpZFwiOm51bGwsXCJkZWZhdWx0X3dhcmVob3VzZV91aWRcIjpudWxsLFwidXNlcl9yb2xlc1wiOm51bGwsXCJ1c2VyX21vZHVsZV9hY2Nlc3NcIjpudWxsLFwidXNlcl9jb21tb25fc2VhcmNoX21vZHVsZVwiOm51bGwsXCJxdWlja0FkZE1vZHVsZXNcIjpudWxsLFwidXNlcl9kYXRhX2FjY2Vzc1wiOm51bGwsXCJhY2NvdW50X2F0dHJpYnV0ZVwiOm51bGwsXCJwYXNzd29yZFwiOm51bGwsXCJjbGllbnRfZGF0ZV9mb3JtYXRcIjpudWxsLFwic2VydmVyX2RhdGVfZm9ybWF0XCI6bnVsbH0iLCJuYmYiOjE3MTUyMzIzMjgsImV4cCI6MTcxNTgzNzEyOCwiaWF0IjoxNzE1MjMyMzI4fQ.VHohLeIFaq9LPF6l8fVJxf9tldpOYsp2Ot8REYmrSXc'
    };
    this.headers = new HttpHeaders(header);
    this.option = { headers: this.headers };
    //this.httpServices.request('get', 'analytics/dashboard/details', '', '', null)
    this.http.get('http://192.168.3.14:3000/api/analytics/dashboard/details', this.option).subscribe(data => {
      if (data) {
        //this.isRefreshChartFlag = false;
        //this.ref.detectChanges();
        //this.table_details = [];
        //this.block_item = [];
        this.dashboardGraphData = [];
        //this.table_details = data.data.dashboardDetailDataRead;
        //this.block_item = data.data.dashboardDetailItemDataRead;
        this.dashboardGraphData = data;
        this.widgetService.actualData.next(this.dashboardGraphData.data);
        // if (this.dashboardGraphData != null && this.dashboardGraphData != undefined) {
        //   this.dashboardGraphData.dashboardDetailDataRead.forEach((x: any) => {
        //     x.isDynamicActiveTab = null;
        //   });
        //   this.dashboardGraphData.dashboardDetailItemDataRead.forEach((y: any) => {
        //     y.isDynamicActiveTab = null;
        //   });
        //   //this.isRefreshChartFlag = true;
        //   //this.ref.detectChanges();
        // }
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

  addItem() {
    this.cards.push(new DashboardCard({
      widgetSettings: {
        widgetTitle: 'Chart example',
      },
      component: ChartWidgetComponent,
      componentName: 'ChartWidgetComponent',
      placement: {
        y: 0,
        x: 0,
        rows: 4,
        cols: 4,
        minItemRows: 3,
        maxItemRows: 10,
        minItemCols: 3,
        maxItemCols: 10
      }
    }));
  }

  cleanDashboard() {
    this.cards = [];
    this.widgetTypes.forEach(x => {
      x.checked = false;
    });
  }

  showWidgetsPanel() {
    this.widgetService.widgetsChartName.next("");
    this.widgetMenuOpened = true;
  }

  hideWidgetsPanel() {
    this.widgetMenuOpened = false;
  }

  public hide: boolean = true;
  onWidgetTypeClicked(widgetType: WidgetType) {
    this.widgetService.widgetsChartName.next(widgetType.module);
    this.widgetService.actualData.next(this.dashboardGraphData.data);
    const card = this.CreateCard(0, 0, widgetType);
    this.addCard(card);
    // if(card.widgetSettings.widgetTitle == 'Bar Chart'){
    //   this.hide = false
    // }
  }

  private CreateCard(x: number, y: number, widgetType: WidgetType) {
    const card = new DashboardCard({
      component: widgetType.component,
      componentName: widgetType.componentName,
      widgetSettings: JSON.parse(JSON.stringify(widgetType.widgetSettings)),
      placement: JSON.parse(JSON.stringify(widgetType.placement))
    });

    card.placement.x = x;
    card.placement.y = y;

    return card;
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
    console.log(this.cards);
  }

  onDragstart(widgetType: WidgetType) {
    this.widgetService.widgetsChartName.next(widgetType.module);
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
}
