import {Injectable} from '@angular/core';

@Injectable()
export class Configuration {
    //TODO: change Server url
    public Server: string = 'http://127.0.0.1/edsa-greouxlocation/v6/dist/';
    public ApiUrl: string = 'assets/services/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
