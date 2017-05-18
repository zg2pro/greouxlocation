import {Component} from "angular2/core"
 
@Component({
    selector: "simple-component",
    template: `
 
&lt;h1&gt;Hallo Angular 2!&lt;/h1&gt;
 
 
&lt;div&gt;
            &lt;label [hidden]="!isCalling"&gt;Ich bin {{name}}.&lt;/label&gt;
 
&lt;div&gt;
                &lt;input [(ngModel)]="name" /&gt;
                &lt;button (click)="toggleCalling()"&gt;toggle Calling&lt;/button&gt;
 
&lt;div&gt;
        &lt;/div&gt;
 
        `
})
export class SimpleComponent {
    private name = "da";
    private isCalling = true;
 
    private toggleCalling() {
        this.isCalling = !this.isCalling;
    }
}