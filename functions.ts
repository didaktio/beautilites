import { valsAreEqual } from './misc';

export type FunctionComparisonStrategy = 'name' | 'strict';
/**
 * Check if two functions are equal. This will work for 99% of use cases.
 * @param func1 Function one of comparison
 * @param func2 Function to compare with first
 * @param options.comparisonStrategy Type of comparison to conduct. Defaults to `'exact'`.
 * `'exact'` Compare the function name, number of (required) arguments, source code, and if possible, the return value.
 * `'name'` Compare only the function name, ie the name specified when it was created. Anonymous functions are supported.
 * @returns Boolean
 */
export function funcsAreEqual(func1: Function, func2: Function, options?: { comparisonStrategy?: FunctionComparisonStrategy }) {
    if (typeof func1 !== 'function') throw Error('The first argument is not a function.');
    if (typeof func2 !== 'function') throw Error('The second argument is not a function.');

    if (options?.comparisonStrategy === 'name') return func1.name === func2.name;

    // Check REQUIRED arguments of each function; if not equal the objects aren't equal.
    if (func1.length !== func2.length) return false;

    // If no required arguments, the return values are compared; if not equal the objects aren't equal.
    if (!func1.length && !func2.length && valsAreEqual(func1(), func2())) return false;

    // Compare the source code. If equal the loop is jumped; else the objects aren't equal.
    if (func1.toString() !== func2.toString()) return false;

    return true;
}