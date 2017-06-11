import { Type } from './type';
export declare class BaseException extends Error {
    message: string;
    stack: any;
    constructor(message?: string);
    toString(): string;
}
export declare function getErrorMsg(typeOrFunc: Type, msg: string): string;
