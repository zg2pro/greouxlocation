export declare type HostBindingsProcessed = {
    classes: StringMap;
    attributes: StringMap;
    properties: StringMap;
};
export declare type HostListenersProcessed = {
    [key: string]: string[];
};
export declare type HostProcessed = {
    hostStatic: StringMap;
    hostBindings: HostBindingsProcessed;
    hostListeners: HostListenersProcessed;
};
