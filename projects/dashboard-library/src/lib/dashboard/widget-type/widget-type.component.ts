import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { WidgetType } from '../models/widget-type.model';
import { WidgetService } from '../_common-services/widget.service';

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

  @ViewChild('dragElement', { static: true })
  private dragElement: ElementRef;
  
  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
    this.widgetService.widgetsChartName.next(false);
  }

  onClicked() {
    this.widgetService.widgetsChartName.next(true);
    //this.widgetTypeClicked.emit(this.widgetType);
  }

  async onDragstart($event) {
    $event.dataTransfer.setDragImage(this.dragElement.nativeElement, 0, 0);
    this.widgetTypeDragstart.emit(this.widgetType);
  }
}
