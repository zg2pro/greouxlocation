import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'Apartment renting in Greoux les Bains', menuType: MenuType.BRAND },
  { path: 'town', title: 'Greoux', menuType: MenuType.LEFT },
  { path: 'visit', title: 'Visit', menuType: MenuType.LEFT },
  { path: 'fares', title: 'Fares', menuType: MenuType.LEFT },
  { path: 'contact', title: 'Contact', menuType: MenuType.RIGHT }
];
