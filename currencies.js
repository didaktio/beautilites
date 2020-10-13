"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrency = exports.getCurrencySymbol = exports.CURRENCIES = void 0;
/**
 * [MORE ON THE WAY] Map of very useful currency data. Root keys are ISO 4217 currency codes.
 * Root values contain several properties:
 * * `symbol` Globally-recognised symbol, e.g., **£**.
 * * `name` Global name of currency, e.g., **Euro**.
 * * `sumbolNative` Native symbol, e.g., in Canada the Canadian Dollar symbol is *$*
 * but globally it is **CA$**.
 * * `decimalDigits` Number of digits after the decimal, e.g., for dollars and pounds it is 2 (£33.00).
 * * `code` The ISO 4217 code of the currency.
 * * `namePlural` Regular plural name (more here: https://english.stackexchange.com/questions/147689/is-there-a-list-of-plural-names-of-currencies).
 */
exports.CURRENCIES = {
    USD: {
        symbol: '$',
        name: 'US Dollar',
        symbolNative: '$',
        decimalDigits: 2,
        // rounding: 0,
        code: 'USD',
        namePlural: 'US dollars'
    },
    CAD: {
        symbol: 'CA$',
        name: 'Canadian Dollar',
        symbolNative: '$',
        decimalDigits: 2,
        // rounding: 0,
        code: 'CAD',
        namePlural: 'Canadian dollars'
    },
    EUR: {
        symbol: '€',
        name: 'Euro',
        symbolNative: '€',
        decimalDigits: 2,
        // rounding: 0,
        code: 'EUR',
        namePlural: 'euros'
    },
    GBP: {
        symbol: '£',
        name: 'British Pound Sterling',
        symbolNative: '£',
        decimalDigits: 2,
        // rounding: 0,
        code: 'GBP',
        namePlural: 'British pounds sterling'
    },
};
const isEuro = (code) => {
    switch (code) {
        case 'FR':
        case 'IE':
        case 'DE':
        case 'DD':
        case 'ES':
        case 'SG': return true;
        default: return false;
    }
};
/**
 * Get the symbol of a currency by its code.
 * @param code ISO 4217 code of the currency.
 * @returns Currency symbol.
 */
exports.getCurrencySymbol = (code) => {
    if (code.length !== 2)
        throw Error('Code must be 2 Letter Country Code (alpha-2)');
    return isEuro(code) ? exports.CURRENCIES['EU'].symbolNative : exports.CURRENCIES[code].symbolNative;
};
/**
 * Get useful information about a currency by its code.
 * @param code ISO 4217 code of the currency.
 * @returns **Currency** object:
 * * `symbol` Globally-recognised symbol, e.g., **£**.
 * * `name` Global name of currency, e.g., **Euro**.
 * * `sumbolNative` Native symbol, e.g., in Canada the Canadian Dollar symbol is *$*
 * but globally it is **CA$**.
 * * `decimalDigits` Number of digits after the decimal, e.g., for dollars and pounds it is 2 (£33.00).
 * * `code` The ISO 4217 code of the currency.
 * * `namePlural` Regular plural name (more here: https://english.stackexchange.com/questions/147689/is-there-a-list-of-plural-names-of-currencies).
 */
exports.getCurrency = (code) => {
    if (code.length !== 2)
        throw Error('Code must be 2 Letter Country Code (alpha-2)');
    return isEuro(code) ? exports.CURRENCIES['EU'] : exports.CURRENCIES[code];
};
//# sourceMappingURL=currencies.js.map