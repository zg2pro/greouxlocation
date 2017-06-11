/// <reference types="angular" />
import { ParsedBindings } from './constants';
export interface AttrProp {
    /**
     * instance property
     */
    prop: string;
    /**
     * attr name in template ( equals prop if not aliased )
     */
    attr: string;
    bracketAttr: string;
    bracketParenAttr: string;
    parenAttr: string;
    /**
     * this is determined only for declaration time types @Input('@'),@Input('<'),@Input('=')
     */
    type: string;
    typeByTemplate: boolean;
}
export interface SetupAttrField {
    mode: string;
    exp: string;
    attrName: string;
}
export interface ProcessedBindings {
    inputs: {
        [key: string]: SetupAttrField;
    };
    attrs: {
        [key: string]: SetupAttrField;
    };
    outputs: {
        [key: string]: SetupAttrField;
    };
}
export declare function setupFields(ngAttrs: ng.IAttributes, rawInputs?: string[], rawOutputs?: string[]): ProcessedBindings;
export declare function _parseFields(names: string[]): AttrProp[];
export declare function _setupInputs(inputs: AttrProp[], ngAttrs: ng.IAttributes): {
    inputs: {
        [propName: string]: SetupAttrField;
    };
    attrs: {
        [propName: string]: SetupAttrField;
    };
};
export declare function _setupOutputs(outputs: AttrProp[], ngAttrs: ng.IAttributes): {
    outputs: {
        [propName: string]: SetupAttrField;
    };
};
/**
 * parses input/output/attrs string arrays from metadata fro further processing
 * @param inputs
 * @param outputs
 * @param attrs
 * @returns {{inputs: ParsedBindingsMap, outputs: ParsedBindingsMap, attrs: ParsedBindingsMap}}
 * @private
 * @deprecated
 */
export declare function _parseBindings({inputs, outputs, attrs}: {
    inputs: string[];
    outputs: string[];
    attrs: string[];
}): ParsedBindings;
