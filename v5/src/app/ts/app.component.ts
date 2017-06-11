import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app.html',
    styleUrls: ['app.css']
})
export class AppComponent {
    imagePacaPath: string;
    constructor() {
        console.log("appComponent");
        this.imagePacaPath = 'resources/img/ind_paca.png';
    }
    
}
