/**
 * Generate an ID. Provided prefixes are followed by an underscore, eg 'user' will return `'user_d213DJw9m...'`
 * @alias `genId`
 * @param prefix Prefix indicating type of data to which the ID will be assigned.
 * @param characters Number of characters in the ID after the prefix. Defaults to 10.
 * @param crypto Whether to use [crypto](https://nodejs.org/api/crypto.html). Accepted values:
 * * `withFallback` (DEFAULT) Use crypto if available, else fallback on strong random string function.
 * * `only` Use crypto only. NOTE: An error will be thrown if crypto is not available.
 * * `disabled` Don't use crytpo.
 * @returns ID string
 */
export function generateId(prefix = '', characters: 6 | 10 | 20 | 30 = 10, crypto: 'withFallback' | 'only' | 'disabled' = 'withFallback') {
    let id = '';

    if (crypto !== 'disabled') {
        // @ts-ignore
        if (typeof window === 'undefined' && process)
            try {
                // @ts-ignore
                id = require('crypto')?.randomBytes(characters / 2).toString('hex');
            } catch (e) {

            }

        else if (window)
            try {
                id = Array.from(
                    (window.crypto || (window as any).msCrypt)?.getRandomValues(new Uint8Array(characters / 2)),
                    (dec: any) => `0${dec.toString(16).substr(-2)}`
                ).join('');
            } catch (e) {

            }
        else if (crypto === 'only') throw Error(`The 'crypto' module is not available. Either run in an environment with crypto available, or set the crypto parameter to 'withFallback'.`);
    }

    return `${prefix ? `${prefix}_` : ''}${id || [...Array(characters)].map(() => Math.random().toString(36)[2]).join('')}`;
}

/**
 * Generate an ID. Provided prefixes are followed by an underscore, eg 'user' will return `'user_d213DJw9m...'`
 * @alias `generateId`
 * @param prefix Prefix indicating type of data to which the ID will be assigned.
 * @param characters Number of characters in the ID after the prefix. Defaults to 10.
 * @param crypto Whether to use [crypto](https://nodejs.org/api/crypto.html). Accepted values:
 * * `withFallback` (DEFAULT) Use crypto if available, else fallback on strong random string function.
 * * `only` Use crypto only. NOTE: An error will be thrown if crypto is not available.
 * * `disabled` Don't use crytpo.
 * @returns ID string
 */
export function genId(prefix?: string, characters: 6 | 10 | 20 | 30 = 10, crypto: 'withFallback' | 'only' | 'disabled' = 'withFallback') {
    return generateId(prefix, characters, crypto);
}

/**
 * Generate a random string of numbers. Under the hood: a random number is multiplied by a quadrillion then trimmed to 10
 * characters (unless specified otherwise).
 * @param chars Character length of string to generate. Defaults to `10`.
 * @returns String
 */
export function genRandomNumberString(chars: 5 | 10 | 15 = 10) {
    return `${Math.floor(Math.random() * 100000000000000)}`.substring(0, chars);
}