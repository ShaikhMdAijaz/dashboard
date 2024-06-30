import { GridsterItem } from 'angular-gridster2';
import { v1 as uuid } from 'uuid';
import { WidgetSettings } from './widget-settings.model';
//import { Ng2ChartsModule} from 'ng2-charts';

export class DashboardCard {
  id:number;
  widget_id:number;
  cardId?: string;
  component: any;
  componentName?: string;

  widgetSettings: WidgetSettings;

  placement: GridsterItem;
  //cards?: DashboardCard[] = [];;
  //ng2Charts: Ng2ChartsModule;

  constructor(card: DashboardCard) {
      if (!this.cardId) {
        this.cardId = uuid();
      }

      Object.assign(this, card);
  }
}
