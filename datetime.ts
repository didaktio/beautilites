import { format } from 'date-fns';

/**
 * Parse a date argument. If a JS Date Object is passed it is just returned; no error is thrown.
 * Strings are passed to the JS Date constructor.
 * @param date JS Date Object or ISO.
 * @returns JS Date Object.
 */
export function parseDate (date: Date | string) {
    return  date instanceof Date ? date : new Date(date);
}

/**
 * Extract and format the time of a date into am/pm format.
 * @param date JS Date Object or ISO.
 * @returns Formatted date(time) string.
 */
export function formatTime (date: Date | string) {
    return format(parseDate(date), 'h:mma');
}

export type DateFormats = 'name-short' | 'name-full' | 'name-md' | 'numeric-slash' | 'numeric-dot';
export interface FormateDateExtras { withTime: boolean; noComma?: boolean, timeSeparator?: string }
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
export function formatDate (date: Date | string, into: DateFormats, extras: FormateDateExtras = { withTime: false }) {
    if (into === 'name-md' || into === 'numeric-slash') extras.timeSeparator = ', '
    let formatted = `${
        into === 'name-full' ? 'EEEE, do MMM yyyy' :
            into === 'name-md' ? 'E MMM d yyyy' :
                into === 'name-short' ? 'MMM d, yyyy' :
                    into === 'numeric-slash' ? 'dd/MM/yy' :
                        into === 'numeric-dot' ? 'dd.MM.yy' :
                            'EEEE, do MMM yyyy'
        }${extras.withTime ? `'${extras.timeSeparator || ' at '}'h:mma` : ''}`;
    if (extras.noComma) formatted = formatted.replace(',', '');
    return format(parseDate(date), formatted);
}

/**
 * Convert seconds to hours, minutes, and seconds.
 * @param seconds Number of seconds to convert.
 * @param extras Extra options to alter configure the conversion:
 * * `map` If true, an object with hrs, mins, and secs properties will be returned instead of a string.
 * @returns hh:mm:ss string or an object containing hours, minutes, and seconds.
 */
export function toHHMMSS(seconds: number, extras?: { map: false }): string;
export function toHHMMSS(seconds: number, extras?: { map: true }): { hrs: number; mins: number; secs: number };
export function toHHMMSS(seconds: number, { map } = { map: false }) {
    let hrs: (number | string) = Math.floor(seconds / 3600),
        mins: (number | string) = Math.floor((seconds - (hrs * 3600)) / 60),
        secs: (number | string) = Math.floor(seconds - (hrs * 3600) - (mins * 60));

    if (map) return { hrs, mins, secs };
    else {
        if (hrs < 10) hrs = '0' + hrs;
        if (mins < 10) mins = '0' + mins;
        if (secs < 10) secs = '0' + secs;
        return `${hrs}:${mins}:${secs}`.split('.')[0];
    }
}

/**
 * Format a duration string into something more human-readable. For example, `03:25:23` is much more
 * pleasing as `3hrs 25mins 23secs`.
 * @param duration Colon-separated string, e.g., 03:25:23.
 * @param extras Extra options to configure the formatting operation:
 * * `withSeconds` Boolean indicating whether to include seconds in the returned string.
 * @returns Formatted duration string.
 */
export function formatDuration (duration: string | number, extras = { withSeconds: false }) {
    let hrs: number, mins: number, secs: number;
    if (typeof duration === 'number') ({ hrs, mins, secs } = toHHMMSS(duration, { map: true }));
    else {
        const chunks = duration.split(':').map(v => +v);
        if (chunks.length <= 1) ({ hrs, mins, secs } = toHHMMSS(+duration, { map: true }));
        else if (chunks.length === 3) ([hrs, mins, secs] = chunks);
        else ([hrs, mins, secs] = [0, +chunks[0], +chunks[1]]);
    }
    let str = '';
    if (hrs) str = str.concat(hrs < 10 ? `${hrs}hr ` : `${hrs}hrs `);
    if (mins) str = str.concat(mins < 10 ? `${mins}min ` : `${mins}mins `);
    if ((extras?.withSeconds || !str) && !!secs) str = str.concat(secs < 10 ? `${secs}s ` : `${secs}s`);
    return str;
}