import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './ts/app.module';
//import {AppComponent} from './ts/app.component';
//import {UpgradeModule} from '@angular/upgrade/static';


platformBrowserDynamic().bootstrapModule(AppModule);

//platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
//    console.log("AppModule:" + AppModule.name);
//    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
//    console.log("upgrading angular-slick");
//    upgrade.bootstrap(document.body, ["slick"], {strictDi: true});
//});
