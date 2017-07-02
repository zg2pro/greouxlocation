import {Component, OnInit} from '@angular/core';
import {AppAnalytics} from './app.analytics';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    navbarCollapsed = true;


    constructor(private _analytics: AppAnalytics) {
    }

    ngOnInit(): void {
        this._analytics.trackPageViews();
    }

}
