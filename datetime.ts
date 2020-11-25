/**
 * Parse a date argument. Date objects are returned as provided; no error is thrown. The function will successfully parse
 * ISO 8601 strings and [***Javascript* timestamps**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now).
 * NOTE: UNIX times (*seconds* since UNIX epoch) are **not** to the same as JS timestamps (*milliseconds* since UNIX epoch). If you
 * want to convert a UNIX time, simply multiply it by 1000 before calling the function (see example below).
 * @alias `parseDate`
 * @param date Date object, [ISO string](https://en.wikipedia.org/wiki/ISO_8601), or
 * [milliseconds since UNIX epoch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now).
 * @returns Date object
 *
 * @example
 * ```
 * // * Convert as ISO string *
 * const myDate = dateParse('2020-11-24T10:43:28.164Z')
 * // returns Tue Nov 24 2020 12:43:28 GMT+0200 (Eastern European Standard Time)
 * ```
 * @example
 * ```
 * // * Convert an JS timestamp *
 * const myDate = dateParse(1606214608164)
 * // returns Tue Nov 24 2020 12:43:28 GMT+0200 (Eastern European Standard Time)
 * ```
 * @example
 * ```
 * // * Convert a Date (returns same Date) *
 * const myDate = dateParse(new Date())
 * // returns Tue Nov 24 2020 12:43:28 GMT+0200 (Eastern European Standard Time)
 * ```
 * @example
 * ```
 * // * Multiply the UNIX time by 1000 *
 * const myDate = parseDate(1606214608 * 1000)
 * // returns Tue Nov 24 2020 12:43:28 GMT+0200 (Eastern European Standard Time)
 * ```
 * @example
 * ```
 * // * Convert using alias *
 * const myDate = parseDate('2020-11-24T10:43:28.164Z')
 * // returns Tue Nov 24 2020 12:43:28 GMT+0200 (Eastern European Standard Time)
 * ```
 */
export function dateParse(date: Date | string | number) {
    if (date instanceof Date) return date;
    return new Date(date);
}

/**
 * Check if two or more JS dates are equal.
 * @param dates Array of dates as JS dates, ISO strings, or milliseconds since UNIX epoch
 * @returns Boolean
 */
export function datesAreEqual(dates: (Date | string | number)[]) {
    let index = 0,
        archetype: typeof dates[number];

    for (const date of dates) {
        archetype = dateParse(dates[index ? 0 : 1]);

        if (dateParse(date) !== archetype)

            index++;
    }

    return true;
}

/**
 * Parse a date argument. Date objects are returned as provided; no error is thrown. The function will successfully parse
 * ISO 8601 strings and [***Javascript* timestamps**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now).
 * NOTE: UNIX times (*seconds* since UNIX epoch) are **not** to the same as JS timestamps (*milliseconds* since UNIX epoch). If you
 * want to convert a UNIX time, simply multiply it by 1000 before calling the function (see example below).
 * @alias `dateParse`
 * @param date Date object, [ISO string](https://en.wikipedia.org/wiki/ISO_8601), or
 * [milliseconds since UNIX epoch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now).
 * @returns Date object
 *
 * @example
 * ```
 * // * Convert as ISO string *
 * const myDate = dateParse('2020-11-24T10:43:28.164Z')
 * // returns Tue Nov 24 2020 12:43:28 GMT+0200 (Eastern European Standard Time)
 * ```
 * @example
 * ```
 * // * Convert an JS timestamp *
 * const myDate = dateParse(1606214608164)
 * // returns Tue Nov 24 2020 12:43:28 GMT+0200 (Eastern European Standard Time)
 * ```
 * @example
 * ```
 * // * Convert a Date (returns same Date) *
 * const myDate = dateParse(new Date())
 * // returns Tue Nov 24 2020 12:43:28 GMT+0200 (Eastern European Standard Time)
 * ```
 * @example
 * ```
 * // * Multiply the UNIX time by 1000 *
 * const myDate = parseDate(1606214608 * 1000)
 * // returns Tue Nov 24 2020 12:43:28 GMT+0200 (Eastern European Standard Time)
 * ```
 * @example
 * ```
 * // * Convert using alias *
 * const myDate = parseDate('2020-11-24T10:43:28.164Z')
 * // returns Tue Nov 24 2020 12:43:28 GMT+0200 (Eastern European Standard Time)
 * ```
 */
export function parseDate(date: Date | string | number) {
    return dateParse(date);
}

/**
 * Extract and format the time of a date into am/pm format.
 * @alias `formatTime`
 * @param date Date object, ISO string, or [JavaScript timestamp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
 * @returns Formatted date(time) string
 */
export function timeFormat(date: Date | string | number) {
    return new Intl.DateTimeFormat('en-US', { timeStyle: 'short' } as any).format(dateParse(date));
}

/**
 * Extract and format the time of a date into am/pm format.
 * @alias `timeFormat`
 * @param date Date object, ISO string, or [JavaScript timestamp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
 * @returns Formatted date(time) string
 */
export function formatTime(date: Date | string | number) {
    return timeFormat(date);
}

export type DateFormats = 'long' | 'medium' | 'short' | 'digits-slash' | 'digits-dot';
export interface FormateDateOptions { withTime: boolean; }
/**
 * Format date into a human-readable string.
 * @alias `formatDate`
 * @param date Date object, ISO string, or [JavaScript timestamp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
 * @param into Format to return, eg for **Thursday 3rd January 2019**:
 * * `long` returns *Thursday, January 3rd 2020* (like Facebook)
 * * `medium` returns *Thu 3rd Jan 2020*
 * * `short` returns *Jan 3, 2020* (like YouTube)
 * * `digits-slash` returns *01/01/2020*
 * * `digits-dot` returns *01.03.2020*
 * @param options.withTime Boolean indicating whether to include the am/pm time, eg *Thu, 3rd Jan 2019 at 2:00PM*.
 * @returns Formatted date string
 */
export function dateFormat(date: Date | string | number, into?: DateFormats, options?: FormateDateOptions) {
    const _date = dateParse(date);
    if (into === 'medium') {
        function appendDateSuffix(t: number) {
            const j = t % 10,
                k = t % 100;
            if (j == 1 && k != 11) return t + 'st';
            if (j == 2 && k != 12) return t + 'nd';
            if (j == 3 && k != 13) return t + 'rd';
            return t + 'th';
        }
        const [dy, mth, date, yr, ...[at, time, period]] = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: options?.withTime ? 'short' : undefined } as any)
            .format(_date)
            .split(' ');
            console.log(time);
        return `${dy.slice(0, 3)} ${mth.slice(0, 3)} ${appendDateSuffix(+date[0].replace(',', ''))} ${yr}${time ? ` ${at} ${time}${period}` : ''}`;
    }
    if (into === 'short'){
        const [mth, dt, yr, ...[time, period]] = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: options?.withTime ? 'short' : undefined } as any)
            .format(_date)
            .split(' ');
            return `${mth} ${dt} ${options?.withTime ? `${yr.replace(',', '')} at ${time}${period}` : `${yr}`}`
    }
    if (into === 'digits-slash') {
        const [mth, dt, yrtm] = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: options?.withTime ? 'short' : undefined } as any)
            .format(_date)
            .split('/')
            .map(x => x.length === 1 ? `0${x}` : x);
        return `${mth}.${dt}.${_date.getFullYear()}${options?.withTime ? `, ${yrtm.split(', ')[1].replace(' ', '')}` : ''}`;
    }
    if (into === 'digits-dot') {
        const [mth, dt, yrtm] = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: options?.withTime ? 'short' : undefined } as any)
            .format(_date)
            .split('/')
            .map(x => x.length === 1 ? `0${x}` : x);
        return `${mth}.${dt}.${_date.getFullYear()}${options?.withTime ? `, ${yrtm.split(', ')[1].replace(' ', '')}` : ''}`;
    }
    else {
        function appendDateSuffix(t: number) {
            const j = t % 10,
                k = t % 100;
            if (j == 1 && k != 11) return t + 'st';
            if (j == 2 && k != 12) return t + 'nd';
            if (j == 3 && k != 13) return t + 'rd';
            return t + 'th';
        }
        let [dy, mth, dt, yr, ...[at, time, period]] = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: options?.withTime ? 'short' : undefined } as any)
            .format(_date)
            .split(' ');
        return `${dy} ${mth} ${appendDateSuffix(+dt.replace(',', ''))} ${yr}${time ? ` ${at} ${time}${period}` : ''}`;
    }
}

/**
 * Format date into a human-readable string.
 * @alias `dateFormat`
 * @param date Date object, ISO string, or [JavaScript timestamp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
 * @param into Format to return, eg for **Thursday 3rd January 2019**:
 * * `long` returns *Thursday, January 3rd 2020* (like Facebook)
 * * `medium` returns *Thu 3rd Jan 2020*
 * * `short` returns *Jan 3, 2020* (like YouTube)
 * * `digits-slash` returns *01/01/2020*
 * * `digits-dot` returns *01.03.2020*
 * @param options.withTime Boolean indicating whether to include the am/pm time, eg *Thu, 3rd Jan 2019 at 2:00PM*.
 * @returns Formatted date string
 */
export function formatDate(date: Date | string | number, into?: DateFormats, options?: FormateDateOptions) {
    return dateFormat(date, into, options);
}

/**
 * Convert seconds to hours, minutes, and seconds.
 * @param seconds Number of seconds to convert
 * @param options.map If true, an object with `hrs`, `mins`, and `secs` will be returned instead of a string.
 * @returns hh:mm:ss string or object containing hours, minutes, and seconds.
 */
export function secsToHHMMSS(seconds: number | string, options?: { map: false }): string;
export function secsToHHMMSS(seconds: number | string, options?: { map: true }): { hrs: number; mins: number; secs: number };
export function secsToHHMMSS(seconds: number | string, options = { map: false }) {
    let hrs: (number | string) = Math.floor(+seconds / 3600),
        mins: (number | string) = Math.floor((+seconds - (hrs * 3600)) / 60),
        secs: (number | string) = Math.floor(+seconds - (hrs * 3600) - (mins * 60));

    if (options.map) return { hrs, mins, secs };
    else {
        if (hrs < 10) hrs = '0' + hrs;
        if (mins < 10) mins = '0' + mins;
        if (secs < 10) secs = '0' + secs;
        return `${hrs}:${mins}:${secs}`.split('.')[0];
    }
}