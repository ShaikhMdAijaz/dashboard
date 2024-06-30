import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { WidgetType } from '../models/widget-type.model';
import { DashboardCard } from '../models/dashboard-card.model';

@Component({
  selector: 'lib-widget-type',
  templateUrl: './widget-type.component.html',
  styleUrls: ['./widget-type.component.scss']
})
export class WidgetTypeComponent {
  @Input() widgetType: WidgetType;

  @Output() widgetTypeClicked = new EventEmitter<WidgetType>();
  @Output() widgetTypeDragstart = new EventEmitter<WidgetType>();
  @Output() widgetRemoved = new EventEmitter<DashboardCard>();

  onWidgetRemoved(event) {
    this.widgetRemoved.emit(event);
  }

  @ViewChild('dragElement', { static: true })
  private dragElement: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onClicked() {
    let passQueryParam = { chartName: this.widgetType.module};
    sessionStorage.setItem("chartsValue", JSON.stringify(passQueryParam));
    this.widgetTypeClicked.emit(this.widgetType);
  }
  
  async onDragstart($event) {
    if(this.widgetType.checked == false){
      $event.dataTransfer.setDragImage(this.dragElement.nativeElement, 0, 0);
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
