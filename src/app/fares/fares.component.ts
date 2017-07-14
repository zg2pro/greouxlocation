import {Component, OnInit} from '@angular/core';
import {FaresService} from './fares.service';
import {Fare} from './fares.metadata';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'fares-component',
    providers: [FaresService],
    templateUrl: './fares.component.html',
    styleUrls: ['./fares.component.css']
})
export class FaresComponent implements OnInit {
    public fares: Fare[];

    dateBeg: NgbDateStruct;
    dateEnd: NgbDateStruct;

    constructor(private _dataService: FaresService) {
    }

    ngOnInit() {
        this.getAllItems();
      //  this.fares.forEach((data: Fare) => {data.category = "fares." + data.category});
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

    onChanged(event: NgbDateStruct, name: string) {
        this[name] = event;
    }

    checkDates() {
        if (this.dateBeg === undefined || this.dateEnd === undefined) {
            alert("Please select both a start and an end date");
            return;
        }
        this._dataService.availability(this.dateBeg, this.dateEnd)
            .subscribe(function (data) {
                if (data) {
                    alert("Our apartment is available at these dates, "
                        + "please proceed to the equipment/conditions section if you want to reserve");
                } else {
                    alert("We apologize but we are currently already booked at these dates, but you can write is an email "
                        + " and if some friend of us has an availability, we'll let you know");
                }
            },
            error =>
                console.log(error), () =>
                console.log('get availbility complete')
            );
    }
}
