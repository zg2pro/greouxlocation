import { Route } from '@angular/router';
import { GreouxComponent } from './greoux.component';

const CHILD_ROUTES: Route[] = [];

export const MODULE_ROUTES: Route[] = [
  { path: 'greoux', component: GreouxComponent, children: [ ...CHILD_ROUTES ] }
]

export const MODULE_COMPONENTS = [
  GreouxComponent
]
