import {Component, OnInit} from '@angular/core';
import {AbstractContentComponent} from './../abstract.content.component';
import {FaresService} from './fares.service';
import {Fare} from './fares.metadata';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

//https://stackoverflow.com/questions/37537157/angular2-no-provider-for-controlcontainer-when-building-a-simple-form
@Component({
    selector: 'fares-component',
    providers: [FaresService],
    templateUrl: 'templates/fares.component.html',
    styleUrls: ['resources/styles/fares.component.css']
})
export class FaresComponent extends AbstractContentComponent implements OnInit {
    public fares: Fare[];

    dateBeg: NgbDateStruct;
    dateEnd: NgbDateStruct;

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

    onChanged(change: any) {
        alert("faresComp:" + change);
    }

    checkDates(dateBeg: any) {
        alert(this.dateBeg + " - " + dateBeg);
    }
}
