import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'navbar.title', menuType: MenuType.BRAND },
  { path: 'greoux', title: 'navbar.greoux', menuType: MenuType.LEFT },
  { path: 'visit', title: 'navbar.visit', menuType: MenuType.LEFT },
  { path: 'fares', title: 'navbar.fares', menuType: MenuType.LEFT },
  { path: 'equipment', title: 'navbar.equipment', menuType: MenuType.LEFT }
];
