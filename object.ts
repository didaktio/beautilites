import { arraysEqual } from "./array";
import { strCamelToSnake, strSnakeToCamel } from "./string";


interface RemoveOptions {
    'undefined:remove'?: boolean;
    'undefined:null'?: boolean;
    'zero'?: boolean;
    'negative'?: boolean;
    'null'?: boolean;
    'false'?: boolean;
    'emptyString'?: boolean;
}
/**
 * Remove non-truthy properties from an object. Note that this operation might not be what you want(!): a value of `false` or `null`
 * might represent something critical. Options can be passed to define which value represents something non-truthy.
 * @param obj Object from which to remove properties.
 * @param options Setting `null` or `emptyString` to true will remove it. Keys with two words values and colon delimiter: the
 * fate of the left-side value is decided by the right, e.g., setting 'undefined:null' to true will change `undefined` values to `null`, and
 * 'undefined:remove' will remove them.
 * @returns Object without property.
 */
export const objRemoveFalsyProps = (obj: any,
    options: RemoveOptions = { null: true, 'undefined:remove': true, 'undefined:null': false, emptyString: true }) => {
    for (const k of Object.keys(obj)) {
        if (options.null && obj[k] === null
            || options.emptyString && obj[k] === ''
            || options['undefined:remove'] && obj[k] === undefined) delete obj[k];
        else if (options['undefined:null'] && obj[k] === undefined) obj[k] = null;
        else if (
            typeof obj[k] === 'object'
            && obj[k] !== null
            && !Array.isArray(obj[k])
            && !objDeepExtractKeys(obj[k]).includes('lc')
        ) obj[k] = objRemoveFalsyProps(obj[k], options);
    }
    return obj || {};
};

/**
 * Check whether two objects are identical.
 * @param obj1 Object one of comparison.
 * @param obj2 Object two of comparison.
 * @returns Boolean.
 */
export const objIsEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    // if both x and y are null or undefined and exactly the same

    if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;
    // if they are not strictly equal, they both need to be Objects

    if (obj1.constructor !== obj2.constructor) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    /* tslint:disable:no-var-keyword */
    for (var p in obj1) {
        if (!obj1.hasOwnProperty(p)) continue;
        // other properties were tested using x.constructor === y.constructor

        if (!obj2.hasOwnProperty(p)) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

        if (obj1[p] === obj2[p]) continue;
        // if they have the same strict value or identity then they are equal

        if (typeof (obj1[p]) !== 'object') return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if (!objIsEqual(obj1[p], obj2[p])) return false;
        // Objects and Arrays must be tested recursively
    }

    for (p in obj2) if (obj2.hasOwnProperty(p) && !obj1.hasOwnProperty(p)) return false;
    // allows x[ p ] to be set to undefined

    return true;
}
/**
 * Omit specific prop(s) from an object.
 * @param obj Object containing unwanted prop(s).
 * @param keys One or more property keys to remove.
 * @returns Object with the specified properties removed.
 */
export function objOmitProp<T, K extends keyof T>(obj: T, ...keys: K[]) {
    const newObj = {} as { [key: string]: any };
    for (const k in obj) if (!keys.includes(k as any)) newObj[k] = obj[k];
    return newObj;
}

/**
 * Change all object keys to camel casing (underscore, e.g., createdAt).
 * @param obj Object with non-snake case keys.
 * @returns New object with changed keys.
 */
export const objCamelifyKeys = (obj: any) => Object.keys(obj).reduce((acc, curr) => ({ ...acc, [strSnakeToCamel(curr)]: obj[curr] }), {} as any);

/**
 * Change all object keys to snake casing (underscore, e.g., created_at).
 * @param obj Object with non-snake case keys.
 * @returns New object with changed keys.
 */
export const objSnakeifyKeys = (obj: any) => Object.keys(obj).reduce((acc, curr) => ({ ...acc, [strCamelToSnake(curr)]: obj[curr] }), {} as any);

/**
 * Get the key of a property using its value.
 * @param object Object including value.
 * @param value Value of property for which you want the key.
 * @returns [string] Property key.
 */
export const objKeyFromVal = (object: { [key: string]: any }, value: any) => Object.keys(object).find(key => object[key] === value);

/**
 * Completely flattens an object, regardless of nest depth. NOTE: Be mindful of properties with identical keys at different levels of the nest;
 * to omit properties from the operation, include them in the exceptions.
 * @param obj Object to flatten.
 * @param extras Exceptions: string of keys to omit from flatten operations.
 * @returns Flattened object.
 */
export const objFlatten = (obj: { [key: string]: any }, extras = { exceptions: [''] }): { [key: string]: any } => Object.assign(
    {},
    ...function flatten(o): any {
        return [].concat(...Object.keys(o)
            .map(k => (typeof o[k] === 'object' && o[k] !== null && !Array.isArray(o[k]) && !extras.exceptions.includes(k)) ? flatten(o[k]) : ({ [k]: o[k] })));
    }(obj)
);

/**
 * Extract all keys from object and return them as an array. Parent keys of nested property are included unless includeParents=false
 * is given as an option. Note: this is only made for nested objects; for non-nested objects, use a simple Object.keys.
 * @param obj Deeply nested object.
 * @returns Array of keys.
 */
export const objDeepExtractKeys = (obj: { [key: string]: any }, options = { includeParents: true }) =>
    options.includeParents ? [...Object.keys(obj), ...Object.keys(objFlatten(obj))] : Object.keys(objFlatten(obj));

/**
 * Merge objects (including arrays). Duplicate strings will be removed from arrays; if this is *not* the intended behaviour,
 * use an ordinary spread operator merge (e.g., `{ ...obj1, ...obj2, prop1 }`).
 * @param objects One or more objects.
 * @returns Merged object.
 */
export function objMerge<A>(a: A): A;
export function objMerge<A, B>(a: A, b: B): A & B;
export function objMerge<A, B, C>(a: A, b: B, c: C): A & B & C;
export function objMerge<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
export function objMerge<T>(...objects: { [key: string]: any }[]) {
    const merge: { [key: string]: any } = {};
    for (const obj of objects) for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const val = obj[key];
            if (val === null) merge[key] = null;
            else if (typeof val === 'object') {
                if (!Array.isArray(val)) merge[key] = merge[key] ? objMerge(merge[key], val) : val;
                else merge[key] = merge[key] && Array.isArray(merge[key]) ? Array.from(new Set(merge[key].concat(val))) : val
            }
            else merge[key] = val;
        }
    }
    return merge;
}

/**
 * Merge objects **(including arrays)** using deep comparison. This is a heavy operation and should be used sparingly.
 * It uses the `objMerge` function under the hood.
 * @param objects One or more objects which contain arrays.
 * @returns Merged object.
 */
export function objArrDeepMerge<A>(a: A): A;
export function objArrDeepMerge<A, B>(a: A, b: B): A & B;
export function objArrDeepMerge<A, B, C>(a: A, b: B, c: C): A & B & C;
export function objArrDeepMerge<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
export function objArrDeepMerge<T>(...objects: { [key: string]: any }[]) {
    const merge: { [key: string]: any } = {};
    for (const obj of objects) for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const val = obj[key];
            if (val === null) merge[key] = null;
            else if (typeof val === 'object') {
                if (!Array.isArray(val)) merge[key] = merge[key] ? objMerge(merge[key], val) : val;
                else merge[key] = merge[key] && Array.isArray(merge[key]) ? merge[key].concat(val.filter(v =>
                    typeof v === 'string' ? !merge[key].includes(v) :
                        Array.isArray(v) ? merge[key].findIndex(x => Array.isArray(x) && arraysEqual(v, x)) === -1 :
                            typeof v === 'object' && v !== null ? merge[key].findIndex(x =>
                                (typeof x === 'object' && x !== null && Array.isArray(x))
                                && arraysEqual(Object.keys(v), Object.keys(x))) === -1 :
                                true)) : val
            }
            else merge[key] = val;
        }
    }
    return merge;
}