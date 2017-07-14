import { Route } from '@angular/router';
import { EquipmentComponent } from './equipment.component';

const CHILD_ROUTES: Route[] = [];

export const MODULE_ROUTES: Route[] = [
  { path: 'equipment', component: EquipmentComponent, children: [ ...CHILD_ROUTES ] }
]

export const MODULE_COMPONENTS = [
  EquipmentComponent
]
