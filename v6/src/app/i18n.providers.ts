import {TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID} from '@angular/core';
import {Observable} from "rxjs/Rx";
//import * as fs from 'fs';

export function getTranslationProviders(): Promise<Object[]> {
    // Get the locale id from the global
    const locale = document['locale'] as string;
    // return no providers if fail to get translation file for locale
    const noProviders: Object[] = [];
    // No locale or U.S. English: no translation providers
    if (!locale || locale === 'en') {
        return Promise.resolve(noProviders);
    }
    // Ex: 'locale/messages.fr.xlf`
    const translationFile = `./assets/locale/messages.${locale}.xlf`;
    let provider = getTranslationsWithoutSystemJs(translationFile)
        .then((translations: string) => [
            {provide: TRANSLATIONS, useValue: translations},
            {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
            {provide: LOCALE_ID, useValue: locale}
        ])
        .catch(() => noProviders); // ignore if file not found

    // debugger;
    return provider;
}

function getTranslationsWithoutSystemJs(file: string) {
//    return new Promise(function(resolve, reject) {
//        fs.readFile(file, function(err, data){
//            if (err) 
//                reject(err); 
//            else 
//                resolve(data);
//        });
//    });
    // changes Start here 
    let text = "";
    let fileRequest = new XMLHttpRequest();
    fileRequest.open("GET", file, true);
    fileRequest.onerror = function (err) {
        console.log(err);
    }
    fileRequest.onreadystatechange = function () {
        if (fileRequest.readyState === 4 &&
            (fileRequest.status === 200 || fileRequest.status == 0)) {
            text = fileRequest.responseText;
        }
    }
    fileRequest.send();
    let observable = Observable.of(text);
    return observable.toPromise();
}
