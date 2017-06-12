import { Route } from '@angular/router';
import { ContactComponent } from './contact.component';

const CHILD_ROUTES: Route[] = [];

export const MODULE_ROUTES: Route[] = [
  { path: 'contact', component: ContactComponent, children: [ ...CHILD_ROUTES ] }
]

export const MODULE_COMPONENTS = [
  ContactComponent
]
