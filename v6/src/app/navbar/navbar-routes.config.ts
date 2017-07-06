import { MenuType, RouteInfo } from './navbar.metadata';

//npm install p3x-angular-compile
//<div [p3x-compile]="data" [p3x-compile-context]="ctx">loading ...</div>
export const ROUTES: RouteInfo[] = [
  { path: '', title: 'HOME.TITLE', menuType: MenuType.BRAND },
  { path: 'greoux', title: 'Greoux', menuType: MenuType.LEFT },
  { path: 'visit', title: 'Visit', menuType: MenuType.LEFT },
  { path: 'fares', title: 'Fares', menuType: MenuType.LEFT },
  { path: 'equipment', title: 'Equipment', menuType: MenuType.LEFT }
];
