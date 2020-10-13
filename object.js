"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objArrDeepMerge = exports.objMerge = exports.objDeepExtractKeys = exports.objFlatten = exports.objKeyFromVal = exports.objSnakeifyKeys = exports.objCamelifyKeys = exports.objOmitProp = exports.objIsEqual = exports.objRemoveFalsyProps = void 0;
const array_1 = require("./array");
const string_1 = require("./string");
/**
 * Remove non-truthy properties from an object. Note that this operation might not be what you want(!): a value of `false` or `null`
 * might represent something critical. Options can be passed to define which value represents something non-truthy.
 * @param obj Object from which to remove properties.
 * @param options Setting `null` or `emptyString` to true will remove it. Keys with two words values and colon delimiter: the
 * fate of the left-side value is decided by the right, e.g., setting 'undefined:null' to true will change `undefined` values to `null`, and
 * 'undefined:remove' will remove them.
 * @returns Object without property.
 */
exports.objRemoveFalsyProps = (obj, options = { null: true, 'undefined:remove': true, 'undefined:null': false, emptyString: true }) => {
    for (const k of Object.keys(obj)) {
        if (options.null && obj[k] === null
            || options.emptyString && obj[k] === ''
            || options['undefined:remove'] && obj[k] === undefined)
            delete obj[k];
        else if (options['undefined:null'] && obj[k] === undefined)
            obj[k] = null;
        else if (typeof obj[k] === 'object'
            && obj[k] !== null
            && !Array.isArray(obj[k])
            && !exports.objDeepExtractKeys(obj[k]).includes('lc'))
            obj[k] = exports.objRemoveFalsyProps(obj[k], options);
    }
    return obj || {};
};
/**
 * Check whether two objects are identical.
 * @param obj1 Object one of comparison.
 * @param obj2 Object two of comparison.
 * @returns Boolean.
 */
exports.objIsEqual = (obj1, obj2) => {
    if (obj1 === obj2)
        return true;
    // if both x and y are null or undefined and exactly the same
    if (!(obj1 instanceof Object) || !(obj2 instanceof Object))
        return false;
    // if they are not strictly equal, they both need to be Objects
    if (obj1.constructor !== obj2.constructor)
        return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.
    /* tslint:disable:no-var-keyword */
    for (var p in obj1) {
        if (!obj1.hasOwnProperty(p))
            continue;
        // other properties were tested using x.constructor === y.constructor
        if (!obj2.hasOwnProperty(p))
            return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined
        if (obj1[p] === obj2[p])
            continue;
        // if they have the same strict value or identity then they are equal
        if (typeof (obj1[p]) !== 'object')
            return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal
        if (!exports.objIsEqual(obj1[p], obj2[p]))
            return false;
        // Objects and Arrays must be tested recursively
    }
    for (p in obj2)
        if (obj2.hasOwnProperty(p) && !obj1.hasOwnProperty(p))
            return false;
    // allows x[ p ] to be set to undefined
    return true;
};
/**
 * Omit specific prop(s) from an object.
 * @param obj Object containing unwanted prop(s).
 * @param keys One or more property keys to remove.
 * @returns Object with the specified properties removed.
 */
function objOmitProp(obj, ...keys) {
    const newObj = {};
    for (const k in obj)
        if (!keys.includes(k))
            newObj[k] = obj[k];
    return newObj;
}
exports.objOmitProp = objOmitProp;
/**
 * Change all object keys to camel casing (underscore, e.g., createdAt).
 * @param obj Object with non-snake case keys.
 * @returns New object with changed keys.
 */
exports.objCamelifyKeys = (obj) => Object.keys(obj).reduce((acc, curr) => ({ ...acc, [string_1.strSnakeToCamel(curr)]: obj[curr] }), {});
/**
 * Change all object keys to snake casing (underscore, e.g., created_at).
 * @param obj Object with non-snake case keys.
 * @returns New object with changed keys.
 */
exports.objSnakeifyKeys = (obj) => Object.keys(obj).reduce((acc, curr) => ({ ...acc, [string_1.strCamelToSnake(curr)]: obj[curr] }), {});
/**
 * Get the key of a property using its value.
 * @param object Object including value.
 * @param value Value of property for which you want the key.
 * @returns [string] Property key.
 */
exports.objKeyFromVal = (object, value) => Object.keys(object).find(key => object[key] === value);
/**
 * Completely flattens an object, regardless of nest depth. NOTE: Be mindful of properties with identical keys at different levels of the nest;
 * to omit properties from the operation, include them in the exceptions.
 * @param obj Object to flatten.
 * @param extras Exceptions: string of keys to omit from flatten operations.
 * @returns Flattened object.
 */
exports.objFlatten = (obj, extras = { exceptions: [''] }) => Object.assign({}, ...function flatten(o) {
    return [].concat(...Object.keys(o)
        .map(k => (typeof o[k] === 'object' && o[k] !== null && !Array.isArray(o[k]) && !extras.exceptions.includes(k)) ? flatten(o[k]) : ({ [k]: o[k] })));
}(obj));
/**
 * Extract all keys from object and return them as an array. Parent keys of nested property are included unless includeParents=false
 * is given as an option. Note: this is only made for nested objects; for non-nested objects, use a simple Object.keys.
 * @param obj Deeply nested object.
 * @returns Array of keys.
 */
exports.objDeepExtractKeys = (obj, options = { includeParents: true }) => options.includeParents ? [...Object.keys(obj), ...Object.keys(exports.objFlatten(obj))] : Object.keys(exports.objFlatten(obj));
function objMerge(...objects) {
    const merge = {};
    for (const obj of objects)
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];
                if (val === null)
                    merge[key] = null;
                else if (typeof val === 'object') {
                    if (!Array.isArray(val))
                        merge[key] = merge[key] ? objMerge(merge[key], val) : val;
                    else
                        merge[key] = merge[key] && Array.isArray(merge[key]) ? Array.from(new Set(merge[key].concat(val))) : val;
                }
                else
                    merge[key] = val;
            }
        }
    return merge;
}
exports.objMerge = objMerge;
function objArrDeepMerge(...objects) {
    const merge = {};
    for (const obj of objects)
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];
                if (val === null)
                    merge[key] = null;
                else if (typeof val === 'object') {
                    if (!Array.isArray(val))
                        merge[key] = merge[key] ? objMerge(merge[key], val) : val;
                    else
                        merge[key] = merge[key] && Array.isArray(merge[key]) ? merge[key].concat(val.filter(v => typeof v === 'string' ? !merge[key].includes(v) :
                            Array.isArray(v) ? merge[key].findIndex(x => Array.isArray(x) && array_1.arraysEqual(v, x)) === -1 :
                                typeof v === 'object' && v !== null ? merge[key].findIndex(x => (typeof x === 'object' && x !== null && Array.isArray(x))
                                    && array_1.arraysEqual(Object.keys(v), Object.keys(x))) === -1 :
                                    true)) : val;
                }
                else
                    merge[key] = val;
            }
        }
    return merge;
}
exports.objArrDeepMerge = objArrDeepMerge;
//# sourceMappingURL=object.js.map