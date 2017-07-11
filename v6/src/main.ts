import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';


let url = new URL("http://xxx" + window.location.search);
let loc = url.searchParams.get("locale");
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

