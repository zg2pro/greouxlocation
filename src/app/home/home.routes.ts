import {Route} from '@angular/router';
import {HomeComponent} from './home.component';

const CHILD_ROUTES: Route[] = [
    //  { path: '', pathMatch: 'full', component: HeroListComponent },
    //  { path: 'detail/:id', component: HeroDetail }
];

export const MODULE_ROUTES: Route[] = [
    {path: '', component: HomeComponent, children: [...CHILD_ROUTES]}
]

export const MODULE_COMPONENTS = [
    HomeComponent
]
