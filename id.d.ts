/**
 * Generate an ID.
 * @param prefix Prefix indicating type data to which this id will be assigned; this ensures the correct prefix is assigned (e.g., `user_d213DJw92msIWOHc203` for payments).
 * @param chars Number of characters in the ID after the prefix. Defaults to 10.
 * @param useCrypto Boolean indicating whether to use the *crypto* library if it is available.
 * @returns New ID [string].
 */
export declare function genId(prefix?: string, chars?: 6 | 10 | 20 | 30, useCrypto?: boolean): string;
/**
 * Generate a random string of numbers. Under the hood: A random number is multiplied by a quadrillion, then trimmed to 10
 * characters or otherwise.
 * @param chars Character length of string to generate. Defaults to 10.
 * @returns Random string [string].
 */
export declare function genRandomNumberString(chars?: 5 | 10 | 15): string;
