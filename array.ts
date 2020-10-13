
/**
 * Check if two arrays contain identical values.
 * @returns Boolean indicating equality.
 */
export const arraysEqual = (array1: any[], array2: any[]) =>
    array1.length === array2.length && array1.every((value, index) => value === array2[index]);