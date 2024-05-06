import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GridsterConfig, GridType, CompactType, DisplayGrid, GridsterComponent } from 'angular-gridster2';
import { DashboardCard } from './models/dashboard-card.model';
import { ChartWidgetComponent } from './widgets/chart-widget/chart-widget.component';
import { WidgetType } from './models/widget-type.model';
import { WidgetService } from './_common-services/widget.service';

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
    description: 'Chart example for the demo.',
    //module: 'SOC',
    module: 'Area Chart',
    thumbnailUrl: 'assets/images/widget-thumbnails/area.png',
    placement: {
        x: 0,
        y: 0,
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
    //module: 'SOC',
    module: 'Bar Chart',
    thumbnailUrl: 'assets/images/widget-thumbnails/barChart.png',
    placement: {
        x: 0,
        y: 0,
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
    //module: 'SOC',
    module: 'Pie Chart',
    thumbnailUrl: 'assets/images/widget-thumbnails/pie.jpeg',
    placement: {
        x: 0,
        y: 0,
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

  constructor(private widgetService: WidgetService) {
  }

  widgetEvents = {
    widgetRemoved: (card: DashboardCard) => {
      const index = this.cards.indexOf(card);
      if (index >= 0) {
        this.cards.splice(index, 1);
      }
    }
  };

  options: GridsterConfig;

  cards: DashboardCard[] = [];

  ngOnInit() {
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
  }

  showWidgetsPanel() {
    this.widgetMenuOpened = true;
  }

  hideWidgetsPanel() {
    this.widgetMenuOpened = false;
  }

  public hide:boolean=true;
  onWidgetTypeClicked(widgetType: WidgetType) {
    this.widgetService.widgetsChartName.next(widgetType.module);
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
    this.cards.push(card);
    //this.cards = JSON.parse(JSON.stringify(this.cards))
    console.log(this.cards);
  }

  onDragstart(widgetType: WidgetType) {
    this.options.maxItemCols = widgetType.placement.maxItemCols;
    this.options.minItemCols = widgetType.placement.minItemCols;
    this.options.maxItemRows = widgetType.placement.maxItemRows;
    this.options.minItemRows = widgetType.placement.minItemRows;
    this.options.defaultItemCols = widgetType.placement.cols;
    this.options.defaultItemRows = widgetType.placement.rows;

    this.changedOptions();

    this.currentDraggableWidgetType = widgetType;
    //this.widgetService.widgetsChartName.next(widgetType.module);
  }
}
