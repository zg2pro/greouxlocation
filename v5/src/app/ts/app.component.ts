import {Component} from '@angular/core';

@Component({
    selector: 'my-app2',
    templateUrl: 'templates/app.html',
    styleUrls: ['app.css']
})
export class AppComponent {
    imagePacaPath: string;
    constructor() {
        this.imagePacaPath = 'resources/img/ind_paca.png';
    }
    
}
