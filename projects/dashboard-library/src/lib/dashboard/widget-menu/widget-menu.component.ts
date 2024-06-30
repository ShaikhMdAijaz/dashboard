import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetType } from '../models/widget-type.model';
import { DashboardCard } from '../models/dashboard-card.model';

@Component({
  selector: 'lib-widget-menu',
  templateUrl: './widget-menu.component.html',
  styleUrls: ['./widget-menu.component.scss']
})
export class WidgetMenuComponent implements OnInit {

  @Input() widgetTypes: WidgetType[];

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

  constructor() {
  }

  ngOnInit() {
  }

  onDragstart(widgetType: WidgetType) {
    if (widgetType.checked == false) {
      this.dragStart.emit(widgetType);
    }
  }

  onWidgetTypeClicked(widgetType: WidgetType) {
    let passQueryParam = { chartName: widgetType.module};
    sessionStorage.setItem("chartsValue", JSON.stringify(passQueryParam));
    this.widgetTypeClicked.emit(widgetType);
  }
}
