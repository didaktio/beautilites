"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomNumberString = exports.genId = void 0;
const dec2hex = (dec) => ('0' + dec.toString(16)).substr(-2);
/**
 * Generate an ID.
 * @param prefix Prefix indicating type data to which this id will be assigned; this ensures the correct prefix is assigned (e.g., `user_d213DJw92msIWOHc203` for payments).
 * @param chars Number of characters in the ID after the prefix. Defaults to 10.
 * @param useCrypto Boolean indicating whether to use the *crypto* library if it is available.
 * @returns New ID [string].
 */
exports.genId = (prefix, chars = 10, useCrypto = true) => {
    if (!useCrypto)
        return `${prefix || ''}${[...Array(chars)].map(() => Math.random().toString(36)[2]).join('')}`;
    let id = '';
    if (typeof window === 'undefined' && process) {
        const crypto = require('crypto');
        id = crypto.randomBytes(chars / 2).toString('hex');
    }
    else if (window) {
        const crypto = (window.crypto || window.msCrypt);
        const arr = new Uint8Array(chars / 2);
        crypto.getRandomValues(arr);
        id = Array.from(arr, dec2hex).join('');
    }
    else
        throw Error(`The 'crypto' module is not available. Either run in an environment with crypto available, or set useCrypto=false.`);
    return id;
};
/**
 * Generate a random string of numbers. Under the hood: A random number is multiplied by a quadrillion, then trimmed to 10
 * characters or otherwise.
 * @param chars Character length of string to generate. Defaults to 10.
 * @returns Random string [string].
 */
exports.genRandomNumberString = (chars = 10) => `${Math.floor(Math.random() * 100000000000000)}`.substring(0, chars);
//# sourceMappingURL=id.js.map