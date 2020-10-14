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
export declare function objRemoveFalsyProps(obj: any, options?: RemoveOptions): any;
/**
 * Check whether two objects are identical.
 * @param obj1 Object one of comparison.
 * @param obj2 Object two of comparison.
 * @returns Boolean.
 */
export declare function objIsEqual(obj1: any, obj2: any): boolean;
/**
 * Omit specific prop(s) from an object.
 * @param obj Object containing unwanted prop(s).
 * @param keys One or more property keys to remove.
 * @returns Object with the specified properties removed.
 */
export declare function objOmitProp<T, K extends keyof T>(obj: T, ...keys: K[]): {
    [key: string]: any;
};
/**
 * Change all object keys to camel casing (underscore, e.g., createdAt).
 * @param obj Object with non-snake case keys.
 * @returns New object with changed keys.
 */
export declare function objCamelifyKeys(obj: any): any;
/**
 * Change all object keys to snake casing (underscore, e.g., created_at).
 * @param obj Object with non-snake case keys.
 * @returns New object with changed keys.
 */
export declare function objSnakeifyKeys(obj: any): any;
/**
 * Get the key of a property using its value.
 * @param object Object including value.
 * @param value Value of property for which you want the key.
 * @returns [string] Property key.
 */
export declare function objKeyFromVal(object: {
    [key: string]: any;
}, value: any): string | undefined;
/**
 * Completely flattens an object, regardless of nest depth. NOTE: Be mindful of properties with identical keys at different levels of the nest;
 * to omit properties from the operation, include them in the exceptions.
 * @param obj Object to flatten.
 * @param extras Exceptions: string of keys to omit from flatten operations.
 * @returns Flattened object.
 */
export declare function objFlatten(obj: {
    [key: string]: any;
}, extras?: {
    exceptions: string[];
}): {
    [key: string]: any;
};
/**
 * Extract all keys from object and return them as an array. Parent keys of nested property are included unless includeParents=false
 * is given as an option. Note: this is only made for nested objects; for non-nested objects, use a simple Object.keys.
 * @param obj Deeply nested object.
 * @returns Array of keys.
 */
export declare function objDeepExtractKeys(obj: {
    [key: string]: any;
}, options?: {
    includeParents: boolean;
}): string[];
/**
 * Merge objects (including arrays). Duplicate strings will be removed from arrays; if this is *not* the intended behaviour,
 * use an ordinary spread operator merge (e.g., `{ ...obj1, ...obj2, prop1 }`).
 * @param objects One or more objects.
 * @returns Merged object.
 */
export declare function objMerge<A>(a: A): A;
export declare function objMerge<A, B>(a: A, b: B): A & B;
export declare function objMerge<A, B, C>(a: A, b: B, c: C): A & B & C;
export declare function objMerge<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
/**
 * Merge objects **(including arrays)** using deep comparison. This is a heavy operation and should be used sparingly.
 * It uses the `objMerge` function under the hood.
 * @param objects One or more objects which contain arrays.
 * @returns Merged object.
 */
export declare function objArrDeepMerge<A>(a: A): A;
export declare function objArrDeepMerge<A, B>(a: A, b: B): A & B;
export declare function objArrDeepMerge<A, B, C>(a: A, b: B, c: C): A & B & C;
export declare function objArrDeepMerge<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
export {};
