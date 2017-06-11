export declare class StringWrapper {
    static fromCharCode(code: number): string;
    static charCodeAt(s: string, index: number): number;
    static split(s: string, regExp: RegExp): string[];
    static equals(s: string, s2: string): boolean;
    static stripLeft(s: string, charVal: string): string;
    static stripRight(s: string, charVal: string): string;
    static replace(s: string, from: string, replace: string): string;
    static replaceAll(s: string, from: RegExp, replace: string): string;
    static slice<T>(s: string, from?: number, to?: number): string;
    static replaceAllMapped(s: string, from: RegExp, cb: Function): string;
    static compare(a: string, b: string): number;
    static includes(str: string, searchString: string, position?: number): any;
    static startsWith(str: string, searchString: string, position?: number): any;
    static endsWith(str: string, searchString: string, position?: number): any;
    static kebabCase(name: string): string;
    static snakeCase(name: string): string;
}
