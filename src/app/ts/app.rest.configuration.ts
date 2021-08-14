import {Injectable} from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = 'http://127.0.0.1/edsa-greouxlocation/v3/target/app/';
    public ApiUrl: string = 'services/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
