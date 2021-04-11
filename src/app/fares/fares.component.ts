import {Component, OnInit} from '@angular/core';
import {FaresService} from './fares.service';
import {Fare} from './fares.metadata';

@Component({
    selector: 'fares-component',
    providers: [FaresService],
    templateUrl: './fares.component.html',
    styleUrls: ['./fares.component.css']
})
export class FaresComponent implements OnInit {
    public fares: Fare[];


    constructor(private _dataService: FaresService) {
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
