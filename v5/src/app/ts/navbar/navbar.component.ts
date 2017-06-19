import {Component, OnInit} from '@angular/core';
import {ROUTES} from './navbar-routes.config';
import {MenuType} from './navbar.metadata';

@Component({
    //moduleId: module.id,
    selector: 'navbar',
    templateUrl: 'templates/navbar.component.html',
    styleUrls: ['resources/styles/navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public menuItems: any[];
    public brandMenu: any;
    isCollapsed = true;

    fullImagePath: string;

    constructor() {
        this.fullImagePath = 'resources/img/ind_sight_of_greoux.jpg';
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
        this.brandMenu = ROUTES.filter(menuItem => menuItem.menuType === MenuType.BRAND)[0];
    }

    public getMenuItemClasses(menuItem: any) {
        return {
            'pull-xs-right': this.isCollapsed && menuItem.menuType === MenuType.RIGHT
        };
    }


}