import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../app.rest.configuration';
import {Fare} from './fares.metadata';

@Injectable()
export class FaresService {


    getFares(): Observable<Fare[]> {
        let fares = this._http.get(this.actionUrl)
            .map(function (response: Response) {
                let fares = <Fare[]> response.json();
                fares.forEach(function (elt) {
                    if (elt.category === "Taxes_de_sejour") {
                        elt.value /= 100;
                    }
                });
                return fares;
            })
            .catch(this.handleError);
        return fares;
    }

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl + 'fares.php';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
