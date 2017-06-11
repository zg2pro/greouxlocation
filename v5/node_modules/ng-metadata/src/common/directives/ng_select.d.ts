/// <reference types="angular" />
export declare abstract class NgSelect {
    ngModelCtrl: ng.INgModelController;
    unknownOption: ng.IAugmentedJQuery;
    renderUnknownOption(val: string): void;
    removeUnknownOption(): void;
    abstract readValue(): string;
    writeValue(value: string): void;
    addOption(value: string, element: ng.IAugmentedJQuery): void;
    removeOption(value: any): void;
    abstract hasOption(value: any): boolean;
    registerOption(optionScope: ng.IScope, optionElement: ng.IAugmentedJQuery, optionAttrs: ng.IAttributes, interpolateValueFn?: Function, interpolateTextFn?: Function): void;
}
