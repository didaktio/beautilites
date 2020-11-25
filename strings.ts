

/**
 * Transform a snake_case string to camelCase.
 * @param string snake_case string
 * @returns camelCase string
 */
export function strSnakeToCamel(string: string) {
  return string.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

/**
 * Transform a camelCase string to snake_case.
 * @param string camelCase string
 * @returns snake_case string
 */
export function strCamelToSnake(string: string) {
  return string.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * Transform a camelCase string to TitleCase.
 * @param string camelCase string
 * @returns TitleCase string
 */
export function strCamelToTitle(string: string) {
  return string.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

/**
 * Check if string is a valid [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
 * @param string String to check
 * @returns Boolean
 */
export function isValidISO8601(string: string) {
  return RegExp(`^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$`).test(string);
}

/**
 * Check if string is [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64).
 * @param string String to check
 * @returns Boolean
 */
export function isBase64Encoded(string: string) {
  return RegExp(`^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$`).test(string);
}

/**
 *
 * Check if string has a URL-like pattern. This function will be accurate for 99.9% of use cases
 * @param string String to analyse
 * @returns Boolean
 */
export function isURL(string: string) {
  return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    .test(string);
}

/**
  * Check if string is has a URL- or domain-like pattern. Not a foolproof method but solid and 99.9% correct.
  * @param string String to analyse
  * @returns Boolean
  */
export function isDomainOrURL(string: string) {
  return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(string) || isURL(string);
}

/**
 * Capitalise a string (make first character of string a capital letter);
 * @param str String to transform
 * @param options.allWords If true, all words will be capitalised. Defaults to `false`.
 * @returns Capitalised string
 */
export function strCapitalise(string: string, options?: { allWords?: boolean; }) {
  return options?.allWords !== true ? string.charAt(0).toUpperCase() + string.slice(1) :
      string.split(' ').map(word => strCapitalise(word)).join(' ');
}