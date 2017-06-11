export declare const INPUT_MODE_REGEX: RegExp;
export declare const BINDING_MODE: Readonly<{
    oneWay: string;
    twoWay: string;
    output: string;
    attr: string;
    optional: string;
}>;
export declare type ParsedBindingValue = {
    mode: string;
    alias: string;
    optional: boolean;
};
export declare type ParsedBindingsMap = {
    [name: string]: ParsedBindingValue;
};
export declare type ParsedBindings = {
    inputs: ParsedBindingsMap;
    outputs: ParsedBindingsMap;
    attrs: ParsedBindingsMap;
    [key: string]: ParsedBindingsMap;
};
