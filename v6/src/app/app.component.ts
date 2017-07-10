import {Component, OnInit} from '@angular/core';
import {AppAnalytics} from './app.analytics';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    navbarCollapsed = true;

    constructor(private _analytics: AppAnalytics, private translate: TranslateService) {
        translate.addLangs(["en", "fr", "de", "it", "sp"]);
        translate.setDefaultLang('en');

        let browserLang = document['locale'] as string;
        
        translate.use(browserLang.match(/en|fr|sp|it|de/) ? browserLang : 'en');
    }

    ngOnInit(): void {
        this._analytics.trackPageViews();
    }

}
