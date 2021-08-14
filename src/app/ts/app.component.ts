import {Component, OnInit} from '@angular/core';
import {AppAnalytics} from './app.analytics';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app.html',
    styleUrls: ['resources/styles/app.css']
})
export class AppComponent implements OnInit {

    navbarCollapsed = true;


    constructor(private _analytics: AppAnalytics) {
    }

    ngOnInit(): void {
        this._analytics.trackPageViews();
    }

}
