/**
 * List of countries, by full name. This is likely all you will ever need but if there are
 * omissions and/or new countries formed for which I know nothing about, feel free to use a pull
 * request.
 */
export declare const COUNTRIES: readonly ["United Kingdom", "United States", "China", "Spain", "France", "Ireland", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Cote D'Ivoire", "Brunei", "Iran", "Guinea Bissau", "Isle of Man", "St Kitts & Nevis", "St Lucia", "St Vincent", "Syria", "Timor-Leste", "Turks & Caicos Islands", "United States Minor Outlying Islands", "Virgin Islands (British)", "Virgin Islands (US)"];
/**
 * Map of countries wherein the keys are country names and the values are their corresponding ISO two-letter codes (**ISO 3166-1 alpha-2**).
 *
 * Access the code of country via bracket notation, e.g., `const myCountry = COUNTRY_CODES["United Kingdom"];`.
 *
 * The country name can also be accessed from by code using the `objKeyFromVal` method.
 */
export declare const COUNTRY_CODES_2: CountryCodes;
/**
 * Map of country codes wherein the keys are two-letter (*ISO 3166-1 alpha-2*) country codes and the values are their corresponding three-letter codes (**ISO 3166-1 alpha-3**).
 *
 * Access the code of country via bracket notation, e.g., `const myCountryISO3 = COUNTRY_CODES_2_3["US];`.
 *
 * Two-letter codes can be accessed by their three-letter code using the `objKeyFromVal` method.
 */
export declare const COUNTRY_CODES_3: {
    AF: string;
    AX: string;
    AL: string;
    DZ: string;
    AS: string;
    AD: string;
    AO: string;
    AI: string;
    AQ: string;
    AG: string;
    AR: string;
    AM: string;
    AW: string;
    AU: string;
    AT: string;
    AZ: string;
    BS: string;
    BH: string;
    BD: string;
    BB: string;
    BY: string;
    BE: string;
    BZ: string;
    BJ: string;
    BM: string;
    BT: string;
    BO: string;
    BQ: string;
    BA: string;
    BW: string;
    BV: string;
    BR: string;
    IO: string;
    BN: string;
    BG: string;
    BF: string;
    BI: string;
    CV: string;
    KH: string;
    CM: string;
    CA: string;
    KY: string;
    CF: string;
    TD: string;
    CL: string;
    CN: string;
    CX: string;
    CC: string;
    CO: string;
    KM: string;
    CG: string;
    CD: string;
    CK: string;
    CR: string;
    CI: string;
    HR: string;
    CU: string;
    CW: string;
    CY: string;
    CZ: string;
    DK: string;
    DJ: string;
    DM: string;
    DO: string;
    EC: string;
    EG: string;
    SV: string;
    GQ: string;
    ER: string;
    EE: string;
    ET: string;
    FK: string;
    FO: string;
    FJ: string;
    FI: string;
    FR: string;
    GF: string;
    PF: string;
    TF: string;
    GA: string;
    GM: string;
    GE: string;
    DE: string;
    GH: string;
    GI: string;
    GR: string;
    GL: string;
    GD: string;
    GP: string;
    GU: string;
    GT: string;
    GG: string;
    GN: string;
    GW: string;
    GY: string;
    HT: string;
    HM: string;
    VA: string;
    HN: string;
    HK: string;
    HU: string;
    IS: string;
    IN: string;
    ID: string;
    IR: string;
    IQ: string;
    IE: string;
    IM: string;
    IL: string;
    IT: string;
    JM: string;
    JP: string;
    JE: string;
    JO: string;
    KZ: string;
    KE: string;
    KI: string;
    KP: string;
    KR: string;
    KW: string;
    KG: string;
    LA: string;
    LV: string;
    LB: string;
    LS: string;
    LR: string;
    LY: string;
    LI: string;
    LT: string;
    LU: string;
    MO: string;
    MK: string;
    MG: string;
    MW: string;
    MY: string;
    MV: string;
    ML: string;
    MT: string;
    MH: string;
    MQ: string;
    MR: string;
    MU: string;
    YT: string;
    MX: string;
    FM: string;
    MD: string;
    MC: string;
    MN: string;
    ME: string;
    MS: string;
    MA: string;
    MZ: string;
    MM: string;
    NA: string;
    NR: string;
    NP: string;
    NL: string;
    NC: string;
    NZ: string;
    NI: string;
    NE: string;
    NG: string;
    NU: string;
    NF: string;
    MP: string;
    NO: string;
    OM: string;
    PK: string;
    PW: string;
    PS: string;
    PA: string;
    PG: string;
    PY: string;
    PE: string;
    PH: string;
    PN: string;
    PL: string;
    PT: string;
    PR: string;
    QA: string;
    RE: string;
    RO: string;
    RU: string;
    RW: string;
    BL: string;
    SH: string;
    KN: string;
    LC: string;
    MF: string;
    PM: string;
    VC: string;
    WS: string;
    SM: string;
    ST: string;
    SA: string;
    SN: string;
    RS: string;
    SC: string;
    SL: string;
    SG: string;
    SX: string;
    SK: string;
    SI: string;
    SB: string;
    SO: string;
    ZA: string;
    GS: string;
    SS: string;
    ES: string;
    LK: string;
    SD: string;
    SR: string;
    SJ: string;
    SZ: string;
    SE: string;
    CH: string;
    SY: string;
    TW: string;
    TJ: string;
    TZ: string;
    TH: string;
    TL: string;
    TG: string;
    TK: string;
    TO: string;
    TT: string;
    TN: string;
    TR: string;
    TM: string;
    TC: string;
    TV: string;
    UG: string;
    UA: string;
    AE: string;
    GB: string;
    US: string;
    UM: string;
    UY: string;
    UZ: string;
    VU: string;
    VE: string;
    VN: string;
    VG: string;
    VI: string;
    WF: string;
    EH: string;
    YE: string;
    ZM: string;
    ZW: string;
};
/**
 * Country two- or three-letter ISO code.
 */
export declare type CountryCodes = {
    [key in CountryName]: string;
};
/**
 * Country full name.
 */
export declare type CountryName = typeof COUNTRIES[number];
/**
 * Convert a country ISO code to a full country name, or vice versa.
 * @param country Two- or three-letter code, or full name of country.
 * @returns Either full name or code of country.
 */
export declare function convertCountry(country: string): any;
/**
* Convert country ISO code to country full name.
* @param country ISO code of country.
* @returns Full name of country.
*/
export declare function codeToCountry(code: string): string | undefined;
/**
 * Convert country full name to its *ISO 3166-1 alpha* code.
 * @param country Full name of country.
 * @param iso ISO format of code to return (two- or three-letter).
 * @returns ISO code of country.
 */
export declare function countryToCode(country: CountryName, iso?: 2 | 3): any;
