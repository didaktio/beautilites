/**
 * Capitalise a string.
 * @param str String to transform.
 * @returns Capitalised string.
 */
export declare function strCapitalise(s: string): void;
/**
 * Transform a snake_case string to camelCase.
 * @param str String to transform.
 * @returns camelCase string.
 */
export declare function strSnakeToCamel(str: string): string;
/**
 * Transform a camelCase string to snake_case.
 * @param str String to transform.
 * @returns snake_case string.
 */
export declare function strCamelToSnake(str: string): string;
/**
 * Transform a camelCase string to TitleCase.
 * @param str String to transform.
 * @returns TitleCase string.
 */
export declare function strCamelToTitle(str: string): string;
/**
 * Check if a string is valid ISO (8601).
 * @param str String to check.
 * @returns Boolean.
 */
export declare function isValidISO8601(str: string): boolean;
/**
 * Check if a string is Base64.
 * @param str String to check.
 * @returns Boolean.
 */
export declare function isBase64Encoded(str: string): boolean;
/**
 * Check if a string has the pattern of a URL (not a domain; these are different!). Not a foolproof method but solid and 99.9% correct.
 * @param str String to analyse.
 * @returns Boolean.
 */
export declare function isURL(str: string): boolean;
/**
  * Check if a string is has the pattern of a domain or URL. Not a foolproof method but solid and 99.9% correct.
  * @param str String to analyse.
  * @returns Boolean.
  */
export declare function isDomainOrURL(str: string): boolean;
