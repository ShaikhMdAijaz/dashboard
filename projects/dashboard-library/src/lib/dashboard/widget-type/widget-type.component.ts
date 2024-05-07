import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { WidgetType } from '../models/widget-type.model';
import { WidgetService } from '../_common-services/widget.service';
import { DashboardCard } from '../models/dashboard-card.model';

@Component({
  selector: 'lib-widget-type',
  templateUrl: './widget-type.component.html',
  styleUrls: ['./widget-type.component.scss']
})
export class WidgetTypeComponent {
  @Input()
  widgetType: WidgetType;

  @Output() widgetTypeClicked = new EventEmitter<WidgetType>();
  @Output() widgetTypeDragstart = new EventEmitter<WidgetType>();
  @Output() widgetRemoved = new EventEmitter<DashboardCard>();

  onWidgetRemoved(event) {
    this.widgetRemoved.emit(event);
  }

  @ViewChild('dragElement', { static: true })
  private dragElement: ElementRef;

  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
    this.widgetService.widgetsChartName.next("");
  }

  onClicked() {
    this.widgetService.widgetsChartName.next(this.widgetType.module);
    this.widgetTypeClicked.emit(this.widgetType);
  }
  
  async onDragstart($event) {
    if(this.widgetType.checked == false){
      $event.dataTransfer.setDragImage(this.dragElement.nativeElement, 0, 0);
      this.widgetService.widgetsChartName.next(this.widgetType.module);
      this.widgetTypeDragstart.emit(this.widgetType);
    }
    else{
      $event.preventDefault();
    }
  }

  onChangeCheckbox(checked, item) {
    if (checked == true) {
      this.onClicked();
    }
    else if(checked == false){
      this.onWidgetRemoved(this.widgetType.widgetSettings.widgetTitle);
    }
  }
}
