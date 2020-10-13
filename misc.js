"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = exports.isBlob = exports.formatBytes = exports.paramOptionsToString = exports.secsToMins = void 0;
/**
 * Convert seconds to minutes.
 * @param seconds Number of seconds.
 * @returns Number of minutes [number].
 */
exports.secsToMins = (seconds) => Math.floor(seconds / 60);
/**
 * Convert object of parameters to API-friendly string. Take an object: the key-value pair will be stringified and have its colon
 * replaced with an '='.
 * @param options Key-value object of parameters.
 * @param startWith Prefix for the string. You might use this to add the '?' that starts most API queries.
 * @returns String.
 */
exports.paramOptionsToString = (options, startWith = '') => {
    let result = startWith;
    /* tslint:disable:forin */
    for (const param in options) {
        if (result && result !== startWith)
            result += '&';
        const val = options[param];
        if (val)
            result += `${param}=${options[param]}`;
        else
            result += `${param}=`;
    }
    return result;
};
const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
/**
 * Format total bytes into human-readable format. The returned unit is determined under the hood and cannot be changed.
 * @param bytes Total bytes.
 * @returns Human-readable string, e.g., '12 GB' or '1KB'.
 */
exports.formatBytes = (bytes) => {
    let l = 0, n = parseInt(`${bytes}`, 10) || 0;
    while (n >= 1024 && ++l)
        n = n / 1024;
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
};
/**
 * Check if some data is a Blob.
 * @param value Data to check.
 * @returns Boolean.
 */
exports.isBlob = (value) => new Blob([value], { type: 'text/plain' }) instanceof Blob;
/**
 * Promise which resolves in the given number of seconds.
 * @param seconds Seconds to wait.
 */
exports.wait = (seconds) => new Promise((r, j) => setTimeout(r, seconds * 1000));
//# sourceMappingURL=misc.js.map