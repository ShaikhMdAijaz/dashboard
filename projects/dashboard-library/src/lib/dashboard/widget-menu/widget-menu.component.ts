import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetType } from '../models/widget-type.model';
import { WidgetService } from '../_common-services/widget.service';
import { DashboardCard } from '../models/dashboard-card.model';

@Component({
  selector: 'lib-widget-menu',
  templateUrl: './widget-menu.component.html',
  styleUrls: ['./widget-menu.component.scss']
})
export class WidgetMenuComponent implements OnInit {

  @Input()
  widgetTypes: WidgetType[];

  @Output()
  closeButtonClicked = new EventEmitter();

  @Output() widgetTypeClicked = new EventEmitter<WidgetType>();

  @Output() dragStart = new EventEmitter<WidgetType>();

  @Output() widgetRemoved = new EventEmitter<DashboardCard>();

  onWidgetRemoved(event) {
    this.widgetRemoved.emit(event);
  }

  onCloseIconClicked() {
    this.closeButtonClicked.emit();
  }

  constructor(private widgetService: WidgetService) {
    this.widgetService.widgetsChartName.subscribe(this.setChartsFlag);
  }

  public setindex: number = 0;
  public areaChart: boolean = false;
  //public barChart: boolean = true;
  public barChart: boolean = false;
  public pieChart: boolean = false;
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

  ngOnInit() {
    this.widgetService.widgetsChartName.next("");
  }

  onDragstart(widgetType: WidgetType) {
    if (widgetType.checked == false) {
      this.widgetService.widgetsChartName.next(widgetType.module);
      this.dragStart.emit(widgetType);
    }
  }

  onChangeCheckbox(b: any, a: any) {

  }

  onWidgetTypeClicked(widgetType: WidgetType) {
    this.widgetService.widgetsChartName.next(widgetType.module);
    this.widgetTypeClicked.emit(widgetType);
  }
}
