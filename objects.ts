
import { ArrayComparisonStrategy, arrFlatten, arrMerge, arrsAreEqual } from './arrays';
import { funcsAreEqual, FunctionComparisonStrategy } from './functions';
import { valsAreEqual } from './misc';
import { strCamelToSnake, strSnakeToCamel } from './strings';


interface ObjRemoveFalsyPropsOptions {
    traverse?: boolean;
    null?: boolean;
    false?: boolean;
    string?: boolean;
    object?: boolean;
    array?: boolean;
    function?: boolean;
    undefined?: 'toNull' | 'remove';
    inclusions?: any[];
    exclusions?: string[];
}
/**
 * Remove (specific) falsy properties from an object.
 * @param object Object from which to remove properties
 * @param options.traverse Whether to search nested objects. Defaults to `true`.
 * @param options.null Whether to remove values of `null`. Defaults to `false`.
 * @param options.false Whether to remove values of `false`. Defaults to `false`.
 * @param options.string Whether to remove **empty** strings. Defaults to `true`.
 * @param options.object Whether to remove empty objects. Defaults to `true`. NOTE: if the removal of properties leaves a nested object
 * empty, it will still be returned as empty.
 * @param options.array Whether to remove **empty** arrays. Defaults to `false`.
 * @param options.function Whether to remove functions with **no required arguments and which return a value equal to `undefined`**.
 * Defaults to `false`.
 * @param options.undefined Replace values of `undefined` with `null`, or remove them. Defaults to `'remove'`.
 * @param options.inclusions Other values to remove, if found.
 * @param options.exclusions Property keys to skip checking
 * @returns New object
 *
 * @todo Options for traversing arrays, using same options as the rules for deletion.
 */
export function objRemoveFalsyProps(object: { [key: string]: any; }, options?: ObjRemoveFalsyPropsOptions) {
    const obj = { ...object },
        keys = options?.exclusions?.length ? Object.keys(obj).filter(k => !options.exclusions?.includes(k)) : Object.keys(obj);

    for (const key of keys) {
        const value = obj[key];
        if (options?.inclusions?.length && options.inclusions.findIndex(x => valsAreEqual(x, value)) !== -1
            || value === null && options?.null === true
            || value === false && options?.false === true
            || value === '' && options?.string !== false
            || options?.array === true && Array.isArray(value) && !value.length) delete obj[key];
        if (value === undefined) {
            if (options?.undefined === 'toNull') obj[key] = null;
            else delete obj[key];
        }
        if (
            options?.traverse !== false
            && typeof value === 'object'
            && value !== null
            && !Array.isArray(value)
        ) {
            if (options?.object === false) {
                if (!Object.keys(value).length) delete obj[key];
            }
            else obj[key] = objRemoveFalsyProps(value, options);
        }
        else if (options?.function && typeof value === 'function' && !value.length && value() === undefined) delete obj[key];
    }
    return obj;
};


/**
 * Remove specific properties from an object.
 * @param object Object containing unwanted prop(s)
 * @param keys One or more property keys to remove
 * @param options.traverse
 * @returns Object
 */
export function objRemoveProps<T, K extends keyof T>(object: T, keys: K[] | string[], options?: { traverse?: boolean; }) {
    const newObj: { [key: string]: any } = {};
    for (const key in object)
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key];
            if (!keys.includes(key as any))
                newObj[key] = options?.traverse && isObject(value) ? objRemoveProps(value, keys as any, options) : value;
        }
    return newObj as Omit<T, K>;
}

/**
 * Change all object keys to camelCase.
 * @param object Object with some or all non-camelCase keys
 * @param options.recursive Boolean indicating whether to change the keys of nested objects. Defaults to `true`.
 * @returns Object
 */
export function objCamelifyKeys(object: { [key: string]: any }, options?: { recursive?: boolean; }) {
    return Object.keys(object).reduce((acc, curr) =>
        ({
            ...acc,
            [strSnakeToCamel(curr)]: options?.recursive !== false && isObject(object[curr]) ? objCamelifyKeys(object[curr], options) : object[curr]
        }),
        {} as { [key: string]: any });
}

/**
 * Change all object keys to snake_case.
 * @param object Object with some or all non-snake_case keys
 * @param options.recursive Boolean indicating whether to change the keys of nested objects. Defaults to `true`.
 * @returns Object
 */
export function objSnakeifyKeys(object: { [key: string]: any }, options?: { recursive?: boolean; }) {
    return Object.keys(object).reduce((acc, curr) =>
        ({
            ...acc,
            [strCamelToSnake(curr)]: options?.recursive !== false && isObject(object[curr]) ? objSnakeifyKeys(object[curr], options) : object[curr]
        }),
        {} as { [key: string]: any });
}

/**
 * Get the key of a property using its value.
 * @param object Object including value to remove
 * @param value Value of property for which you want the key
 * @param options.traverse Boolean indicating whether to search nested objects. Defaults to `false`.
 * @returns Key as string
 */
export function objKeyFromVal(object: { [key: string]: any }, value: any, options?: { traverse?: boolean; }) {
    if (!options?.traverse) return Object.keys(object).find(key => valsAreEqual(object[key], value));

    for (const key in object)
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            if (valsAreEqual(object[key], value)) return key;
            if (isObject(object[key])) return objKeyFromVal(object[key], value);
        }
}

/**
 * Flatten an object by moving all nested object properties to the root level. NOTE: Properties with identical keys at descendant levels
 * of the nest will be replaced by their children. To omit properties from the operation, include them in the exclusions.
 * @param object Object to flatten
 * @param options.exclusions Array of keys to omit
 * @returns Object
 *
 * @todo TODO: options for returning conflicting values?
 */
export function objFlatten(object: { [key: string]: any }, options?: { exclusions?: string[]; }): { [key: string]: any } {
    return Object.assign(
        {},
        ...function flatten(o): any {
            return [].concat(...Object.keys(o)
                .map(k => (typeof o[k] === 'object' && o[k] !== null && !Array.isArray(o[k]) && !options?.exclusions?.includes(k)) ? flatten(o[k]) : ({ [k]: o[k] })));
        }(object)
    );
}

/**
 * Check if two objects have identical properties. The type and severity of comparison can be configured
 * with the `options` parameter. Since arrays and values of null are technically objects they will be
 * accepted, but ideally this is used for comparing key-value objects only. Arrays will be passed to the `arrsAreEqual`
 * function, and values of `null` can be compared with a simple `===`.
 * @param object1 Key-value object
 * @param object2 Key-value object
 * @param options.traverse Boolean indicating whether to check nested objects. Defaults to `true`.
 * @param options.exclusions Array of property keys to skip.
 * @param options.arrayComparisonStrategy Type of comparison to conduct on arrays. Defaults to `'exact'`.
 * * `'elements'` Only compare existence of identical elements between arrays; ordering doesn't matter.
 * * `'exact'` Compare existence *and* order.
 * @param options.functionComparisonStrategy Type of comparison to conduct on functions. Defaults to `'exact'`.
 * * `'exact'` Compare the function name, number of (required) arguments, and if possible, the return value.
 * * `'name'` Compare only the function name, i.e., the name under which it's stored on the parent object.
 * @returns Boolean
 */
export function objsAreEqual<T extends { [key: string]: any; }, K extends keyof T>(object1: T, object2: T, options?: {
    traverse?: boolean;
    exclusions?: K[];
    arrayComparisonStrategy?: 'elements' | 'exact';
    functionComparisonStrategy?: 'name' | 'strict';
}) {
    // Accept only objects to maintain accuracy when types are escaped.
    if (typeof object1 !== 'object' || typeof object2 !== 'object')
        throw Error('Only key-value type objects can be compared.');

    // Immediately return true both values are the same reference, null, or undefined,
    // or the same number (positive, negative, NaN), string, or boolean.
    if (Object.is(object1, object2)) return true;

    // If constructors aren't equal, the objects aren't equal.
    if (object1.constructor !== object2.constructor) return false;

    // If arrays are provided, use the `arrsAreEqual` function.
    if (Array.isArray(object1) && Array.isArray(object2))
        return arrsAreEqual([object1, object2], {});

    // Iterate over each prop in object.
    for (const key in object1) if (!options?.exclusions?.includes(key as any)) {
        // If other object doesn't contain property, the objects aren't equal.
        if (!Object.hasOwnProperty.call(object2, key)) return false;

        const obj1prop = object1[key], obj2prop = object2[key];

        // If types don't match, the objects aren't equal.
        if (typeof obj1prop !== typeof obj2prop) return false;

        // Jump the loop if both props are null or undefined, or the same number (positive, negative, NaN),
        // string, or boolean.
        if (Object.is(obj1prop, obj2prop)) continue;

        // If property is a function, there are some checks possible depending on the provided options and function source.
        if (typeof obj1prop === 'function') {
            if (funcsAreEqual(obj1prop, obj2prop, { comparisonStrategy: options?.functionComparisonStrategy })) continue;
            else return false;
        }

        // Properties must be a typeof 'object'. Either arrays...
        if (Array.isArray(obj1prop) && Array.isArray(obj2prop)) {
            // Compare two arrays using requested severity (or 'exact' comparison by default).
            if (!arrsAreEqual([obj1prop, obj2prop], options)) return false;
        }
        // ...or key-value objects, in which case recursion is used.
        else if (options?.traverse !== false && !objsAreEqual(obj1prop, obj2prop, options)) return false;
    }

    // Iterate over each prop in object2.
    // If other object doesn't contain property, they aren't equal.
    for (const key in object2)
        if (!options?.exclusions?.includes(key as any))
            if (!Object.hasOwnProperty.call(object1, key)) return false;

    return true;
};

/**
 * Convert object of parameters to API-friendly string. Take an object: the key-value pair will be stringified and have its colon
 * replaced with an '='.
 * @param params Key-value object of parameters
 * @param startWith Prefix for the string. You might use this to add the '?' which begins typical query strins.
 * @param options.arraySeparator Character with which to separate elements in arrays. Defaults to `'|'`;
 * @returns Query string
 */
export function objToQueryString(object: { [key: string]: any }, startWith = '', options?: { arraySeparator?: string; }) {
    let result = startWith;
    for (const param in object)
        if (Object.prototype.hasOwnProperty.call(object, param)) {
            if (result && result !== startWith) result += '&';
            const val = object[param];
            if (val) result += `${param}=${Array.isArray(val) ? val.join(options?.arraySeparator || '|') : (isObject(val)) ? objToQueryString(val) : val}`;
            else result += `${param}=`;
        }
    return result.length > 1 ? result : '';
}
/**
 * Safely check if an object has a specific property. This function protects against objects with a prototype of
 * `null` by utilising the `Object.hasOwnProperty.call` method.
 * @param object Object to check
 * @param key Property name
 * @param options.traverse Boolean indicating whether to search nested objects. Defaults to `false`.
 * @returns Boolean
 */
export function objHasKey(object: { [key: string]: any; }, key: string, options?: { traverse?: boolean; }) {
    if (!options?.traverse) return Object.prototype.hasOwnProperty.call(object, key);

    for (const _key in object) if (Object.prototype.hasOwnProperty.call(object, _key)) {
        if (_key === key) return true;

        if (options?.traverse) {
            const value = object[_key];
            if (value !== null && typeof value === 'object' && !Array.isArray(value) && objHasKey(value, key, options)) return true;
        }
    }
}

/**
 * Search an object for the presence of a specific value. Only key-value objects are accepted.
 * @param object Key-value object to analyse
 * @param value Value to search for
 * @param options.traverse Boolean indicating whether to search nested objects. Defaults to `false`.
 * @param options.arrayComparisonStrategy Type of comparison to conduct on arrays, ie how to determine
 * whether arrays are equal. Defaults to `'exact'`.
 * * `'elements'` Only compare existence of identical elements between arrays; ordering doesn't matter. 𝒩 arrays are equal if they
 * contain the same elements, regardless of order.
 * * `'exact'` Compare existence *and* order. 𝒩 arrays are equal if they contain the same elements in the same order.
 * @returns Array with two elements:
 * * [0] Boolean indicating whether the value was found
 * * [1] Object containing the `key` under which the value is stored, and the `value` itself.
 * */
export function objHasVal(object: { [key: string]: any; }, value: any, options?: {
    traverse?: boolean;
    arrayComparisonStrategy?: ArrayComparisonStrategy;
}): [boolean, undefined | { key: string | number; value: any; }] {
    for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key)) {
        const x = object[key];
        if (Object.is(x, value)) return [true, { key, value }];
        if (typeof x === 'object') {
            if (Array.isArray(value) && Array.isArray(x) && arrsAreEqual([x, value], options)) return [true, { key, value }];
            if (options?.traverse) {
                const [has, prop] = objHasVal(x, value, options);
                if (has) return [has, prop];
            }
        }
    }
    return [false, undefined];
}

/**
 * Merge two or more object. Objects are analysed **in the order they are provided**.
 * @param objects Array of one or more objects
 * @param options.deep Alias for the below options. Default
 * ```
 * *   {
 * *   traverse: true // cannot be overwritten
 * *   arrayOptions: {
 * *      mergeStrategy: 'merge', // cannot be written
 * *      comparisonStrategy: 'exact', // will be overwritten if parameter also provided
 * *      functionComparisonStrategy: 'name' // will be overwritten if parameter also provided
 * *     }
 * *   }
 * ```
 * @param options.traverse Boolean indicating whether to merge nested objects. Defaults
 * @param options.arrayOptions.mergeStrategy Strategy for merging arrays stored under the same key (defaults to `overwrite`).
 * * `'overwrite'` Sequentially overwrite, eg if both  object 1 and object 5 have a array stored under
 * the key `shoppingList`, object 5's array will be returned.
 * * `'append'` Recursively add arrays to beginning of the  first array found under key x.
 * * `'prepend'` Recursively add arrays to end of the first array found under key x.
 * * `'merge'` Merge arrays by comparing elements using a strict or provided strategy.
 * @param options.arrayOptions.comparisonStrategy Type of comparison to conduct on arrays, ie how to determine
 * whether arrays are equal. Defaults to `'exact'`.
 * * `'elements'` Only compare existence of identical elements between arrays; ordering doesn't matter. 𝒩 arrays are equal if they
 * contain the same elements, regardless of order.
 * * `'exact'` Compare existence *and* order. 𝒩 arrays are equal if they contain the same elements in the same order.
 * @param options.arrayOptions.functionComparisonStrategy Type of comparison to conduct on functions. Defaults to `'exact'`.
 * `'exact'` Compare the function name, number of (required) arguments, source code, and if possible, the return value.
 * `'name'` Compare only the function name, ie the name specified when it was created. Anonymous functions are supported.
 * @returns Merged object
 */
export function objMerge<Obj extends { [key: string]: any; }, MergedObject extends Obj>(
    objects: (Partial<Obj> | { [key: string]: any; })[],
    options?: {
        deep?: boolean;
        arrayOptions?: {
            mergeStrategy?: 'overwrite' | 'append' | 'prepend' | 'merge';
            comparisonStrategy?: ArrayComparisonStrategy;
            functionComparisonStrategy?: FunctionComparisonStrategy;
        }
        traverse?: boolean;
    }): MergedObject {
    if (options?.deep) options = {
        traverse: true,
        arrayOptions: {
            mergeStrategy: 'merge',
            comparisonStrategy: options?.arrayOptions?.comparisonStrategy || 'exact',
            functionComparisonStrategy: options?.arrayOptions?.functionComparisonStrategy || 'name'
        }
    };
    const mergedObj: { [key: string]: any } = {};
    for (const obj of objects) for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newVal = obj[key];

            if (typeof newVal === 'object') {
                // Cover null, which is of type object. Because JavaScript.
                if (newVal === null) mergedObj[key] = null;

                const existingVal = mergedObj[key];

                if (Array.isArray(newVal)) {
                    mergedObj[key] = existingVal && Array.isArray(existingVal) ?
                        (options?.arrayOptions?.mergeStrategy === 'append' ? existingVal.concat(newVal)
                            : options?.arrayOptions?.mergeStrategy === 'prepend' ? newVal.concat(existingVal)
                                : options?.arrayOptions?.mergeStrategy === 'merge' ?
                                    arrMerge([existingVal, newVal], {
                                        flat: options?.traverse,
                                        arrayComparisonStrategy: options?.arrayOptions?.comparisonStrategy
                                    })
                                    : newVal) : newVal;

                }

                else if (options?.traverse !== false) mergedObj[key] = existingVal ? objMerge([existingVal, newVal], options) : newVal;
            }
            else mergedObj[key] = newVal;
        }
    }
    return mergedObj as MergedObject;
}

/**
 * Check if object is a non-primitive (key-value) object, with option to check if a primitive. A classic method for checking
 * data types is using the `typeof` and/or `instanceof` operator, but such checks aren't
 * [failsafe](https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript).
 * @param value Any value
 * @param options.primitive Check only if the value is a primitive object. Note that values of `null` and `array` will return
 * `true`, as will ~any value created using a constructors (eg `new String('my string')` or `new Car('Tesla')`).
 * @returns Boolean
 */
export function isObject(value?: any, options?: { primitive?: boolean }) {
    return options?.primitive ? typeof value === 'object' : Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Extract all keys from object and return them as an array.
 * @param object Deeply nested object
 * @param options.traverse Boolean indicating whether to return the keys of nested objects. Defaults to `true`.
 * @param options.flat Boolean indicating whether to return a single array of all keys found at every level of descendancy. NOTE:
 * This option will only apply if `traverse` is not set to `false`.
 * @param options.removeDuplicates Boolean indicating whether to remove duplicate keys, eg if `name` is found in the root object
 * and in a nested object. Defaults to `false`.
 * @returns Array of key array(s)
 */
export function objExtractKeys(object: { [key: string]: any }, options?: {
    traverse?: boolean;
    flat?: boolean;
    removeDuplicates?: boolean;
}) {
    if (options?.traverse === false) return Object.keys(object);

    let keys = [[]] as any[];
    for (const k in object) {
        keys[0].push(k);
        const value = object[k];
        if (isObject(value)) keys.push(objExtractKeys(value, options))
    }
    if (options?.flat) keys = arrFlatten(keys);
    if (options?.removeDuplicates) keys = [...new Set(keys)];

    return keys;
}