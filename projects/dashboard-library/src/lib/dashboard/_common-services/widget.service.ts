import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  widgetsChartName = new Subject<any>();
  actualData = new Subject<any>();
constructor() { }

}
