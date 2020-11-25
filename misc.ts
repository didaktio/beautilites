import { ArrayComparisonStrategy, arrsAreEqual } from './arrays';
import { secsToHHMMSS } from './datetime';
import { funcsAreEqual, FunctionComparisonStrategy } from './functions';
import { objsAreEqual } from './objects';


/**
 * Convert seconds to minutes. The returned data type is equal to the provided.
 * @param seconds Number of seconds
 * @returns Number of minutes
 */
export function secsToMins(seconds: number | string) {
    const mins = Math.floor(+seconds / 60);
    return typeof seconds === 'number' ? mins : `${mins}`;
}

/**
 * Format a duration string into something human-readable, eg `03:25:23` is far less pleasing than `3hrs 25mins 23secs`.
 * @param duration Colon-separated string (eg '03:25:23')
 * @param options.withSeconds Boolean indicating whether to include seconds
 * @returns Formatted duration string
 */
export function formatDuration(duration: string | number, options = { withSeconds: false }) {
    let hrs: number, mins: number, secs: number;
    if (typeof duration === 'number') ({ hrs, mins, secs } = secsToHHMMSS(duration, { map: true }));
    else {
        const chunks = duration.split(':').map(v => +v);
        if (chunks.length <= 1) ({ hrs, mins, secs } = secsToHHMMSS(+duration, { map: true }));
        else if (chunks.length === 3) ([hrs, mins, secs] = chunks);
        else ([hrs, mins, secs] = [0, +chunks[0], +chunks[1]]);
    }
    let str = '';
    if (hrs) str = str.concat(hrs < 10 ? `${hrs}hr ` : `${hrs}hrs `);
    if (mins) str = str.concat(mins < 10 ? `${mins}min ` : `${mins}mins `);
    if ((options?.withSeconds || !str) && !!secs) str = str.concat(secs < 10 ? `${secs}s ` : `${secs}s`);
    return str;
}

/**
 * Format bytes into human-readable format. The returned unit is determined under the hood and cannot be changed.
 * @param bytes Number or string
 * @returns Human-readable string, eg `12 GB` or `1KB`.
 */
export function formatBytes(bytes: number | string) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let l = 0, n = parseInt(bytes as any, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${(n.toFixed(n < 10 && l > 0 ? 1 : 0))} ${units[l]}`;
}

/**
 * Check if data is a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
 * @param value Data to check
 * @returns Boolean
 */
export function isBlob(value: any) {
    return new Blob([value], { type: 'text/plain' }) instanceof Blob;
}

/**
 * Promise which resolves in the given number of seconds.
 * @param seconds Seconds to wait
 */
export function wait(seconds: number | 'string') {
    return new Promise((r, j) => setTimeout(r, +seconds * 1000));
}

/**
 * Convert a time unit and amount to seconds.
 * @param unit `minute`, `hour`, or `day`
 * @param amount Amount of requested unit
 * @returns Number of seconds
 */
export function calculateSeconds(unit: 'minute' | 'hour' | 'day', amount: number | string) {
    if (typeof amount === 'string') amount = +amount;
    if (unit === 'minute') return amount * 60;
    else if (unit === 'hour') return (amount * 60) * 60;
    else if (unit === 'day') return ((amount * 24) * 60) * 60;
    else return amount;
}

export interface ValsAreEqualOptions {
    traverse?: boolean;
    arrayComparisonStrategy?: ArrayComparisonStrategy;
    functionComparisonStrategy?: FunctionComparisonStrategy;
}

/**
 * Check if two values are equal. All data types are supported. Depending on the value, multiple **Beautilities** functions are
 * used under the hood, such as `arrsAreEqual` and `objsAreEqual`; these can and should be used instead if the data types are
 * already known.
 * @param value1 First value of comparison, any type
 * @param value2 Second value of comparison
 * @param options.traverse Whether to check nested objects. Defaults to `true`.
 * @param options.arrayComparisonStrategy Type of comparison to conduct on arrays, ie how to determine
 * whether arrays are equal. Defaults to `'exact'`.
 * * `'elements'` Only compare existence of identical elements between arrays; ordering doesn't matter. 𝒩 arrays are equal if they
 * contain the same elements, regardless of order.
 * * `'exact'` Compare existence *and* order. 𝒩 arrays are equal if they contain the same elements in the same order.
 * @param options.functionComparisonStrategy Type of comparison to conduct on functions. Defaults to `'exact'`.
 * `'exact'` Compare the function name, number of (required) arguments, source code, and if possible, the return value.
 * `'name'` Compare only the function name, ie the name specified when it was created. Anonymous functions are supported.
 * @returns Boolean
 */
export function valsAreEqual<T extends any>(value: T, value2: T, options?: ValsAreEqualOptions): boolean;
export function valsAreEqual(value1: any, value2: any, options?: ValsAreEqualOptions) {
    if (typeof value1 !== typeof value2) return false;

    if (typeof value1 === 'function') return funcsAreEqual(value1, value2, { comparisonStrategy: options?.functionComparisonStrategy });

    if (typeof value1 === 'object') {
        if (Array.isArray(value1) && Array.isArray(value2)) return arrsAreEqual([value1, value2], options);
        return objsAreEqual(value1, value2, options);
    }

    // Cover strings, numbers, null, and undefined.
    // More: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description.
    return (Object.is(value1, value2));
}
