import {Component, OnInit} from '@angular/core';
import {AbstractContentComponent} from './../abstract.content.component';
import {FaresService} from './fares.service';
import {Fare} from './fares.metadata';

@Component({
    selector: 'fares-component',
    providers: [FaresService],
    templateUrl: 'templates/fares.component.html',
    styleUrls: ['resources/styles/fares.component.css']
})
export class FaresComponent extends AbstractContentComponent implements OnInit {
    public fares: Fare[];

    constructor(private _dataService: FaresService) {
        super();
    }

    ngOnInit() {
        this.getAllItems();
    }

    private getAllItems(): void {
        this._dataService
            .getFares()
            .subscribe(
            (data: Fare[]) =>
                this.fares = data,
            error =>
                console.log(error), () =>
                console.log('Get all Items complete')
            );
    }
}
