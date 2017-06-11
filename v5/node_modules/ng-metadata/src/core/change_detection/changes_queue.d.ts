/// <reference types="angular" />
export declare class ChangesQueue {
    onChangesQueue: Function[];
    flushOnChangesQueue: () => void;
    buildFlushOnChanges($rootScope: ng.IRootScopeService): void;
}
export declare const changesQueueService: ChangesQueue;
