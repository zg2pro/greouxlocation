import {Injectable} from '@angular/core';

@Injectable()
export class Configuration {
    //TODO: change Server url
    public Server: string = '';
    public ApiUrl: string = 'assets/services/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
