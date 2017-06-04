import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/home.html'
})
export class AppComponent {
    imagePacaPath: string;
    constructor() {
        this.imagePacaPath = 'resources/img/ind_paca.png';
    }
    
}
