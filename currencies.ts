/**
 * [MORE ON THE WAY] Useful currency data. Root keys are [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html)currency codes.
 * Values are objects containing the following properties:
 * * `symbol` Global symbol (eg *£*)
 * * `name` Global name (eg *euro*)
 * * `symbolNative` Native symbol (eg in Canada the Canadian Dollar is represented as *$*, but globally it is *CA$*)
 * * `decimalDigits` Number of digits after the decimal (eg for dollars and pounds it's 2 (£33.*00*))
 * * `code` ISO code of the currency
 * * `namePlural` Regular [plural name](https://english.stackexchange.com/questions/147689/is-there-a-list-of-plural-names-of-currencies)
 */
export const CURRENCIES = {
    USD: {
        symbol: '$',
        name: 'US Dollar',
        symbolNative: '$',
        decimalDigits: 2,
        // rounding: 0,
        code: 'USD',
        namePlural: 'US dollars'
    } as Currency,
    CAD: {
        symbol: 'CA$',
        name: 'Canadian Dollar',
        symbolNative: '$',
        decimalDigits: 2,
        // rounding: 0,
        code: 'CAD',
        namePlural: 'Canadian dollars'
    } as Currency,
    EUR: {
        symbol: '€',
        name: 'Euro',
        symbolNative: '€',
        decimalDigits: 2,
        // rounding: 0,
        code: 'EUR',
        namePlural: 'euros'
    } as Currency,
    GBP: {
        symbol: '£',
        name: 'British Pound Sterling',
        symbolNative: '£',
        decimalDigits: 2,
        // rounding: 0,
        code: 'GBP',
        namePlural: 'British pounds sterling'
    } as Currency,
} as const;

/**
Useful currency data.
 * @propertys
 * * `symbol` Global symbol (eg *£*)
 * * `name` Global name (eg *euro*)
 * * `symbolNative` Native symbol (eg in Canada the Canadian Dollar is represented as *$*, but globally it is *CA$*)
 * * `decimalDigits` Number of digits after the decimal (eg for dollars and pounds it's 2 (£33.*00*))
 * * `code` ISO code of the currency
 * * `namePlural` Regular [plural name](https://english.stackexchange.com/questions/147689/is-there-a-list-of-plural-names-of-currencies)
 */
export interface Currency {
    symbol: string;
    name: string;
    symbolNative: string;
    decimalDigits: number;
    // rounding: number;
    code: string;
    namePlural: string;
}

const isEuro = (code: string) => {
    switch (code) {
        case 'FR':
        case 'IE':
        case 'DE':
        case 'DD':
        case 'ES':
        case 'SG': return true;
        default: return false;
    }
}

/**
 * Get currency symbol by its ISO code.
 * @param code [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) code
 * @returns Currency symbol
 */
export function getCurrencySymbol (code: string) {
    if (code.length !== 2) throw Error('Code must be 2 Letter Country Code (alpha-2)');
    return isEuro(code) ? CURRENCIES['EU'].symbolNative : CURRENCIES[code].symbolNative;
}

/**
 * Get useful information about a currency by its ISO code.
 * @param code [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) code of the currency.
 * @returns `Currency` object:
 * * `symbol` Global symbol (eg *£*)
 * * `name` Global name (eg *euro*)
 * * `symbolNative` Native symbol (eg in Canada the Canadian Dollar is represented as *$*, but globally it is *CA$*)
 * * `decimalDigits` Number of digits after the decimal (eg for dollars and pounds it's 2 (£33.*00*))
 * * `code` ISO code of the currency
 * * `namePlural` Regular [plural name](https://english.stackexchange.com/questions/147689/is-there-a-list-of-plural-names-of-currencies)
 */
export function getCurrency (code: string) {
    if (code.length !== 2) throw Error('Code must be 2 Letter Country Code (alpha-2)');
    return isEuro(code) ? CURRENCIES['EU'] : CURRENCIES[code];
}
