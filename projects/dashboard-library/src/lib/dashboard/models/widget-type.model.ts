import { GridsterItem } from 'angular-gridster2';
import { WidgetSettings } from './widget-settings.model';
//import { Ng2ChartsModule} from 'ng2-charts';

export class WidgetType {
    placement: GridsterItem;

    /* Widget component to create dynamically */
    component: any;
    componentName: string;

    widgetSettings: WidgetSettings;

    description: string;
    module: string;
    thumbnailUrl: string;
    //ng2Charts: Ng2ChartsModule;
}
