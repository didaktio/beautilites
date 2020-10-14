/**
 * Capitalise a string.
 * @param str String to transform.
 * @returns Capitalised string.
 */
export function strCapitalise(s: string) {
  s.replace(/^[a-z]/, v => v.toUpperCase());
}
/**
 * Transform a snake_case string to camelCase.
 * @param str String to transform.
 * @returns camelCase string.
 */
export function strSnakeToCamel(str: string) {
  return str.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}
/**
 * Transform a camelCase string to snake_case.
 * @param str String to transform.
 * @returns snake_case string.
 */
export function strCamelToSnake(str: string) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}
/**
 * Transform a camelCase string to TitleCase.
 * @param str String to transform.
 * @returns TitleCase string.
 */
export function strCamelToTitle(str: string) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}
/**
 * Check if a string is valid ISO (8601).
 * @param str String to check.
 * @returns Boolean.
 */
export function isValidISO8601(str: string) {
  return RegExp(`^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$`).test(str);
}
/**
 * Check if a string is Base64.
 * @param str String to check.
 * @returns Boolean.
 */
export function isBase64Encoded(str: string) {
  return RegExp(`^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$`).test(str);
}
/**
 * Check if a string has the pattern of a URL (not a domain; these are different!). Not a foolproof method but solid and 99.9% correct.
 * @param str String to analyse.
 * @returns Boolean.
 */
export function isURL(str: string) {
  return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    .test(str);
}

/**
  * Check if a string is has the pattern of a domain or URL. Not a foolproof method but solid and 99.9% correct.
  * @param str String to analyse.
  * @returns Boolean.
  */
export function isDomainOrURL(str: string) {
  return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(str) || isURL(str);
}