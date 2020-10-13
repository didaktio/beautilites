/**
 * Parse a date argument. If a JS Date Object is passed it is just returned; no error is thrown.
 * Strings are passed to the JS Date constructor.
 * @param date JS Date Object or ISO.
 * @returns JS Date Object.
 */
export declare const parseDate: (date: Date | string) => Date;
/**
 * Extract and format the time of a date into am/pm format.
 * @param date JS Date Object or ISO.
 * @returns Formatted date(time) string.
 */
export declare const formatTime: (date: Date | string) => string;
export declare type DateFormats = 'name-short' | 'name-full' | 'name-md' | 'numeric-slash' | 'numeric-dot';
export interface FormateDateExtras {
    withTime: boolean;
    noComma?: boolean;
    timeSeparator?: string;
}
/**
 * Format a date into a human-readable string.
 * @param date JS Date Object or ISO.
 * @param into Format to return, e.g., for **Thursday 3rd January 2019**:
 * * `name-full` *Thursday, 3rd Jan 2019* (like Facebook).
 * * `name-md` *Thu 3rd Jan 2019*.
 * * `name-short` *Jan 3, 2019* (like YouTube).
 * * `numeric-slash` *03/01/2019*.
 * * `numeric-dot` *03.01.2019*.
 * @param extras Extra options to configure the formatting operation:
 * * `withTime` Boolean indicating whether to include the time in am/pm format, e.g., *Thu, 3rd Jan 2019 at 2:00PM*.
 * @returns Formatted date string.
 */
export declare const formatDate: (date: Date | string, into: DateFormats, extras?: FormateDateExtras) => string;
/**
 * Convert seconds to hours, minutes, and seconds.
 * @param seconds Number of seconds to convert.
 * @param extras Extra options to alter configure the conversion:
 * * `map` If true, an object with hrs, mins, and secs properties will be returned instead of a string.
 * @returns hh:mm:ss string or an object containing hours, minutes, and seconds.
 */
export declare function toHHMMSS(seconds: number, extras?: {
    map: false;
}): string;
export declare function toHHMMSS(seconds: number, extras?: {
    map: true;
}): {
    hrs: number;
    mins: number;
    secs: number;
};
/**
 * Format a duration string into something more human-readable. For example, `03:25:23` is much more
 * pleasing as `3hrs 25mins 23secs`.
 * @param duration Colon-separated string, e.g., 03:25:23.
 * @param extras Extra options to configure the formatting operation:
 * * `withSeconds` Boolean indicating whether to include seconds in the returned string.
 * @returns Formatted duration string.
 */
export declare const formatDuration: (duration: string | number, extras?: {
    withSeconds: boolean;
}) => string;
