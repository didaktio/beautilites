import { FunctionComparisonStrategy } from './functions';
import { valsAreEqual } from './misc';


export type ArrayComparisonStrategy = 'elements' | 'exact';
/**
 * Check if two or more arrays have equal properties.
 * @param arrays Array of arrays to compare
 * @param options.traverse Boolean indicating whether to check nested objects. Defaults to `true`.
 * @param options.arrayComparisonStrategy Type of comparison to conduct on arrays, ie how to determine
 * whether arrays are equal. Defaults to `'exact'`.
 * * `'elements'` Only compare existence of identical elements between arrays; ordering doesn't matter. 𝒩 arrays are equal if they
 * contain the same elements, regardless of order.
 * * `'exact'` Compare existence *and* order. 𝒩 arrays are equal if they contain the same elements in the same order.
 * @param options.functionComparisonStrategy Type of comparison to conduct on functions. Defaults to `'exact'`.
 * `'exact'` Compare the function name, number of (required) arguments, source code, and if possible, the return value.
 * `'name'` Compare only the function name, ie the name specified when it was created. Anonymous functions are supported.
 * @param options.exclusions Array of values to exclude from comparison.
 * @returns Boolean
 */
export function arrsAreEqual(arrays: (any[])[], options?: {
    traverse?: boolean;
    arrayComparisonStrategy?: ArrayComparisonStrategy;
    functionComparisonStrategy?: FunctionComparisonStrategy;
    exclusions?: any[];
}) {
    if (arrays.length <= 1) throw Error('At least two arrays must be provided.');

    let index = 0,
        archetype: typeof arrays[number];

    // Strict comparison
    if (options?.arrayComparisonStrategy === 'exact')
        for (let array of arrays) {
            if (options?.exclusions?.length) array = array.filter(x => options.exclusions?.findIndex(y => valsAreEqual(x, y)) === -1);
            archetype = arrays[index ? 0 : 1];

            // If lengths are unequal, all arrays are not equal.
            if (array.length !== archetype.length) return false;

            // Check likeness and index equality of elements.
            if (!array.every((v, i) => valsAreEqual(v, archetype[i], options))) return false;

            index++;
        }
    // Element comparison
    else
        for (let array of arrays) {
            if (options?.exclusions?.length) array = array.filter(x => options.exclusions?.findIndex(y => valsAreEqual(x, y)) === -1);
            archetype = arrays[index ? 0 : 1];

            // If lengths are unequal, all arrays are not equal.
            if (array.length !== archetype.length) return false;

            // Check existence of elements, regardless of index.
            for (const el of array) if (archetype.findIndex(x => valsAreEqual(x, el, options)) === -1) return false;

            index++;
        }

    return true;
}

/**
 * Check if value is an array.
 * @returns Boolean
 */
export function isArray(value: any) {
    return Array.isArray(value);
}

/**
 * Merge two or more arrays, removing any duplicates.
 * @param arrays At least two arrays to merge
 * @param traverse Boolean indicating whether to merge nested arrays and objects. Default to `false`.
 * @param options.arrayComparisonStrategy Type of comparison to conduct on arrays, ie how to determine
 * whether arrays are equal. Defaults to `'exact'`.
 * * `'elements'` Only compare existence of identical elements between arrays; ordering doesn't matter. 𝒩 arrays are equal if they
 * contain the same elements, regardless of order.
 * * `'exact'` Compare existence *and* order. 𝒩 arrays are equal if they contain the same elements in the same order.
 *  @param options.functionComparisonStrategy Type of comparison to conduct on functions. Defaults to `'exact'`.
 * `'exact'` Compare the function name, number of (required) arguments, source code, and if possible, the return value.
 * `'name'` Compare only the function name, ie the name specified when it was created. Anonymous functions are supported.
 * @param options.removeFalsyEls If `true`, elements equalling `''`, `false`, `0`, `null`,  and `undefined` will be removed.
 * Alternatively, an array of elements to remove can be provided. The default matching strategy is strict, but will be overridden
 * if the `arrayComparisonStrategy` and/or `functionComparisonStrategy` is provided.
 * @returns Single, merged array
 */
export function arrMerge<Arr extends any[], MergedArray extends Arr>(arrays: Arr[], options?: {
    flat?: boolean;
    arrayComparisonStrategy?: ArrayComparisonStrategy;
    functionComparisonStrategy?: FunctionComparisonStrategy;
    removeFalsyEls?: true | any[];
}) {
    const merged = [] as any as MergedArray;
    for (const array of arrays)
        for (const el of array)
            if (merged.findIndex(x => valsAreEqual(x, el, options)) === -1) {
                if (Array.isArray(el) && options?.flat)
                    merged.push(...arrMerge([merged, el], options).filter(x => merged.findIndex(y => valsAreEqual(y, x, options)) === -1))
                else merged.push(el);
            }
    return (options?.removeFalsyEls ? (options.removeFalsyEls === true ? merged.filter(Boolean)
        : options.removeFalsyEls.length ?
            merged.filter(x => (options?.removeFalsyEls as any[]).findIndex(y => valsAreEqual(x, y)) === -1)
            : merged)
        : merged) as MergedArray[];
}

/**
 * Completely flatten an array.
 * @param array Array with n children arrays
 * @param options.removeDuplicates Whether to remove duplicate values from the returned array. This works for all data types, by
 * using deep comparison.
 * @param options.arrayComparisonStrategy (if `removeDuplicates=true`) Type of comparison to conduct on arrays, ie how to determine
 * whether arrays are equal. Defaults to `'exact'`.
 * * `'elements'` Only compare existence of identical elements between arrays; ordering doesn't matter. 𝒩 arrays are equal if they
 * contain the same elements, regardless of order.
 * * `'exact'` Compare existence *and* order. 𝒩 arrays are equal if they contain the same elements in the same order.
 * @param options.functionComparisonStrategy Type of comparison to conduct on functions. Defaults to `'exact'`.
 * `'exact'` Compare the function name, number of (required) arguments, source code, and if possible, the return value.
 * `'name'` Compare only the function name, ie the name specified when it was created. Anonymous functions are supported.
 */
export function arrFlatten(array: any[], options?: {
    removeDuplicates?: boolean;
    arrayComparisonStrategy?: ArrayComparisonStrategy;
    functionComparisonStrategy?: FunctionComparisonStrategy;
}) {
    let result: any[] = [];

    if ('flat' in Array.prototype) result = array.flat(Infinity);
    else for (const el of array) Array.isArray(el) ? result.push(...arrFlatten(el, options)) : result.push(el);

    if (options?.removeDuplicates) {
        const _result: typeof result = [];
        for (const r of result)
            if (_result.findIndex(x => valsAreEqual(x, r, { arrayComparisonStrategy: options?.arrayComparisonStrategy })) === -1)
                _result.push(r);
        result = _result;
    }

    return result;
}
