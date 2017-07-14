import { Route } from '@angular/router';
import { VisitComponent } from './visit.component';

const CHILD_ROUTES: Route[] = [];

export const MODULE_ROUTES: Route[] = [
  { path: 'visit', component: VisitComponent, children: [ ...CHILD_ROUTES ] }
]

export const MODULE_COMPONENTS = [
  VisitComponent
]
