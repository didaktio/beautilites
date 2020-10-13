"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arraysEqual = void 0;
/**
 * Check if two arrays contain identical values.
 * @returns Boolean indicating equality.
 */
exports.arraysEqual = (array1, array2) => array1.length === array2.length && array1.every((value, index) => value === array2[index]);
//# sourceMappingURL=array.js.map