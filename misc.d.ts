/**
 * Convert seconds to minutes.
 * @param seconds Number of seconds.
 * @returns Number of minutes [number].
 */
export declare function secsToMins(seconds: number): number;
/**
 * Convert object of parameters to API-friendly string. Take an object: the key-value pair will be stringified and have its colon
 * replaced with an '='.
 * @param options Key-value object of parameters.
 * @param startWith Prefix for the string. You might use this to add the '?' that starts most API queries.
 * @returns String.
 */
export declare function paramOptionsToString(options: {
    [key: string]: any;
}, startWith?: string): string;
/**
 * Format total bytes into human-readable format. The returned unit is determined under the hood and cannot be changed.
 * @param bytes Total bytes.
 * @returns Human-readable string, e.g., '12 GB' or '1KB'.
 */
export declare function formatBytes(bytes: number): string;
/**
 * Check if some data is a Blob.
 * @param value Data to check.
 * @returns Boolean.
 */
export declare function isBlob(value: any): boolean;
/**
 * Promise which resolves in the given number of seconds.
 * @param seconds Seconds to wait.
 */
export declare function wait(seconds: number): Promise<unknown>;
