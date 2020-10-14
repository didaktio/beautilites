"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDuration = exports.toHHMMSS = exports.formatDate = exports.formatTime = exports.parseDate = void 0;
const date_fns_1 = require("date-fns");
/**
 * Parse a date argument. If a JS Date Object is passed it is just returned; no error is thrown.
 * Strings are passed to the JS Date constructor.
 * @param date JS Date Object or ISO.
 * @returns JS Date Object.
 */
function parseDate(date) {
    return date instanceof Date ? date : new Date(date);
}
exports.parseDate = parseDate;
/**
 * Extract and format the time of a date into am/pm format.
 * @param date JS Date Object or ISO.
 * @returns Formatted date(time) string.
 */
function formatTime(date) {
    return date_fns_1.format(parseDate(date), 'h:mma');
}
exports.formatTime = formatTime;
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
function formatDate(date, into, extras = { withTime: false }) {
    if (into === 'name-md' || into === 'numeric-slash')
        extras.timeSeparator = ', ';
    let formatted = `${into === 'name-full' ? 'EEEE, do MMM yyyy' :
        into === 'name-md' ? 'E MMM d yyyy' :
            into === 'name-short' ? 'MMM d, yyyy' :
                into === 'numeric-slash' ? 'dd/MM/yy' :
                    into === 'numeric-dot' ? 'dd.MM.yy' :
                        'EEEE, do MMM yyyy'}${extras.withTime ? `'${extras.timeSeparator || ' at '}'h:mma` : ''}`;
    if (extras.noComma)
        formatted = formatted.replace(',', '');
    return date_fns_1.format(parseDate(date), formatted);
}
exports.formatDate = formatDate;
function toHHMMSS(seconds, { map } = { map: false }) {
    let hrs = Math.floor(seconds / 3600), mins = Math.floor((seconds - (hrs * 3600)) / 60), secs = Math.floor(seconds - (hrs * 3600) - (mins * 60));
    if (map)
        return { hrs, mins, secs };
    else {
        if (hrs < 10)
            hrs = '0' + hrs;
        if (mins < 10)
            mins = '0' + mins;
        if (secs < 10)
            secs = '0' + secs;
        return `${hrs}:${mins}:${secs}`.split('.')[0];
    }
}
exports.toHHMMSS = toHHMMSS;
/**
 * Format a duration string into something more human-readable. For example, `03:25:23` is much more
 * pleasing as `3hrs 25mins 23secs`.
 * @param duration Colon-separated string, e.g., 03:25:23.
 * @param extras Extra options to configure the formatting operation:
 * * `withSeconds` Boolean indicating whether to include seconds in the returned string.
 * @returns Formatted duration string.
 */
function formatDuration(duration, extras = { withSeconds: false }) {
    let hrs, mins, secs;
    if (typeof duration === 'number')
        ({ hrs, mins, secs } = toHHMMSS(duration, { map: true }));
    else {
        const chunks = duration.split(':').map(v => +v);
        if (chunks.length <= 1)
            ({ hrs, mins, secs } = toHHMMSS(+duration, { map: true }));
        else if (chunks.length === 3)
            ([hrs, mins, secs] = chunks);
        else
            ([hrs, mins, secs] = [0, +chunks[0], +chunks[1]]);
    }
    let str = '';
    if (hrs)
        str = str.concat(hrs < 10 ? `${hrs}hr ` : `${hrs}hrs `);
    if (mins)
        str = str.concat(mins < 10 ? `${mins}min ` : `${mins}mins `);
    if (((extras === null || extras === void 0 ? void 0 : extras.withSeconds) || !str) && !!secs)
        str = str.concat(secs < 10 ? `${secs}s ` : `${secs}s`);
    return str;
}
exports.formatDuration = formatDuration;
//# sourceMappingURL=datetime.js.map