import { GridsterItem } from 'angular-gridster2';
import { v1 as uuid } from 'uuid';
import { WidgetSettings } from './widget-settings.model';
//import { Ng2ChartsModule} from 'ng2-charts';

export class DashboardCard {

  cardId?: string;
  component: any;
  componentName?: string;

  widgetSettings: WidgetSettings;

  placement: GridsterItem;
  //ng2Charts: Ng2ChartsModule;

  constructor(card: DashboardCard) {
      if (!this.cardId) {
        this.cardId = uuid();
      }

      Object.assign(this, card);
  }
}
