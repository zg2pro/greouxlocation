import { Route } from '@angular/router';
import { FaresComponent } from './fares.component';

const CHILD_ROUTES: Route[] = [];

export const MODULE_ROUTES: Route[] = [
  { path: 'fares', component: FaresComponent, children: [ ...CHILD_ROUTES ] }
]

export const MODULE_COMPONENTS = [
  FaresComponent
]
