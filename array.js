"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arraysEqual = void 0;
/**
 * Check if two arrays contain identical values.
 * @returns Boolean indicating equality.
 */
function arraysEqual(array1, array2) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}
exports.arraysEqual = arraysEqual;
//# sourceMappingURL=array.js.map