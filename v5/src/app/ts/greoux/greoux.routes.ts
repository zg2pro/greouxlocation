import { Route } from '@angular/router';
import { GreouxComponent } from './greoux.component';

const CHILD_ROUTES: Route[] = [
//  { path: '', pathMatch: 'full', component: HeroListComponent },
//  { path: 'detail/:id', component: HeroDetail }
];

export const MODULE_ROUTES: Route[] = [
  { path: 'greoux', component: GreouxComponent, children: [ ...CHILD_ROUTES ] }
]

export const MODULE_COMPONENTS = [
  GreouxComponent
]
