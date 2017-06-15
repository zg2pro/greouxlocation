import {AfterViewInit} from '@angular/core';

declare var $: any;


export class AbstractContentComponent implements AfterViewInit {

    ngAfterViewInit() {
        setTimeout(function () {
            $("footer").css("position", "relative");
            var relativeHeight = $("body")[0].offsetHeight;
            if (relativeHeight < $(window).height()) {
                // does not have overflow, TODO: add position: absolute to footer
                $("footer").css("position", "absolute");
            }
        }, 350);
    }


}
