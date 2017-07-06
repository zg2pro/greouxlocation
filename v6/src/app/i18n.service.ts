import {Injectable} from '@angular/core';
import {I18NHtmlParser, HtmlParser, Xliff} from '@angular/compiler';
import {getTranslationProviders} from './i18n.providers';

@Injectable()
export class I18NService {
    private _source: string;
    private _translations: {[name: string]: any};

    constructor() {
        let xliff = new Xliff();
        getTranslationProviders().then(providers => {
            this._source = providers[0]['useValue'];
            this._translations = xliff.load(this._source, '');
        });
    }

    get(key: string, interpolation: any[] = []) {
        if (this._translations === undefined) {
            let _local_this = this;
            setTimeout(function () {
                return _local_this.get(key, interpolation);
            }, 500);
        } else {
            let parser = new I18NHtmlParser(new HtmlParser(), this._source);
            let placeholders = this._getPlaceholders(this._translations[key]);
            let parseTree = parser.parse(`<div i18n="@@${key}">content ${this._wrapPlaceholders(placeholders).join(' ')}</div>`, 'someI18NUrl');

            return this._interpolate(parseTree.rootNodes[0]['children'][0].value, this._interpolationWithName(placeholders, interpolation));
        }
    }

    private _getPlaceholders(nodes: any[]): string[] {
        return nodes
            .filter((node) => node.hasOwnProperty('name'))
            .map((node) => `${node.name}`);
    }

    private _wrapPlaceholders(placeholders: string[]): string[] {
        return placeholders
            .map((node) => `{{${node}}}`);
    }

    private _interpolationWithName(placeholders: string[], interpolation: any[]): {[name: string]: any} {
        let asObj = {};

        placeholders.forEach((name, index) => {
            asObj[name] = interpolation[index];
        });

        return asObj;
    }

    private _interpolate(pattern: string, interpolation: {[name: string]: any}) {
        let compiled = '';
        compiled += pattern.replace(/{{(\w+)}}/g, function (match, key) {
            if (interpolation[key] && typeof interpolation[key] === 'string') {
                match = match.replace(`{{${key}}}`, interpolation[key]);
            }
            return match;
        });

        return compiled;
    }
}