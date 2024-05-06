import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetType } from '../models/widget-type.model';
import { WidgetService } from '../_common-services/widget.service';

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

  onCloseIconClicked() {
    this.closeButtonClicked.emit();
  }

  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
    this.widgetService.widgetsChartName.next(false);
  }

  onDragstart(widgetType: WidgetType) {
    this.dragStart.emit(widgetType);
    this.widgetService.widgetsChartName.next(widgetType.module);
  }

  onWidgetTypeClicked(widgetType: WidgetType) {
    this.widgetService.widgetsChartName.next(true);
    //this.widgetTypeClicked.emit(widgetType);
  }
}
