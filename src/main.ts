import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

let getParameterByName = function(name, url) {
    if (!url){
         url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let loc = getParameterByName("locale", null);
if (loc === undefined || loc === "" || loc === null) {
    loc = navigator['language'] || navigator['userLanguage'];
}
if (loc === "en-US" || loc === "en-GB") {
    loc = "en";
}
document['locale'] = loc;

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

