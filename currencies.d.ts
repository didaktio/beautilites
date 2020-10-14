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
export declare const CURRENCIES: {
    [key: string]: Currency;
};
/**
 * Useful information about a currency. Properties:
 * * `symbol` Globally-recognised symbol, e.g., **£**.
 * * `name` Global name of currency, e.g., **Euro**.
 * * `sumbolNative` Native symbol, e.g., in Canada the Canadian Dollar symbol is *$*
 * but globally it is **CA$**.
 * * `decimalDigits` Number of digits after the decimal, e.g., for dollars and pounds it is 2 (£33.00).
 * * `code` The ISO 4217 code of the currency.
 * * `namePlural` Regular plural name (more here: https://english.stackexchange.com/questions/147689/is-there-a-list-of-plural-names-of-currencies).
 */
export interface Currency {
    symbol: string;
    name: string;
    symbolNative: string;
    decimalDigits: number;
    code: string;
    namePlural: string;
}
/**
 * Get the symbol of a currency by its code.
 * @param code ISO 4217 code of the currency.
 * @returns Currency symbol.
 */
export declare function getCurrencySymbol(code: string): string;
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
export declare function getCurrency(code: string): Currency;
