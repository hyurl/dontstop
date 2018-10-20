export interface DontStopProxy {
    [x: string]: any;
    readonly name: string;
}

export function dontStop(name: string): DontStopProxy;
export function dontStop<T extends Function>(target: T, name?: string): T & DontStopProxy;
export function dontStop<T = object>(target: T, name: string): T & DontStopProxy;

export default dontStop;