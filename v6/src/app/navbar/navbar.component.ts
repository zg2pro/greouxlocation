import {Component, OnInit} from '@angular/core';
import {ROUTES} from './navbar-routes.config';
import {MenuType} from './navbar.metadata';


@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public menuItems: any[];
    public brandMenu: any;
    isCollapsed = true;

    fullImagePath: string;

    constructor() {
        this.fullImagePath = 'assets/img/ind_sight_of_greoux.jpg';
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