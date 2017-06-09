import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './ts/app.module';
import { UpgradeModule } from '@angular/upgrade/static';

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['my-app'], {strictDi: true});
});
