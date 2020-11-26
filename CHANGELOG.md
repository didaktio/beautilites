# 1.2.0 (26.11.2020)

##### BREAKING CHANGES
* `objMerge` renamed to `objsMerge`.
* `objArrDeepMerge` removed. Use `objsMerge` with defined options instead.
* `objOmitProp` renamed to `objRemoveProps`.
* `objIsEqual` renamed to `objsAreEqual`.
* `objRemoveFalsyProps` Totally new structure for `options` parameter, and much greater flexibility.
* `paramOptionsToString` renamed to `objToQueryString`.
* `arraysEqual` renamed to `arrsAreEqual`.
* `toHHMMSS` renamed to `secsToHHMMSS`.
* `formatDate`:
    * `into` parameter:
         *  `'name-full'` is now `'long'`.
         *  `'name-md'` is now `'medium'`.
         *  `'name-short'` is now `'short'`.
         *  `'numeric-slash'` is now `'digits-slash'`.
         *  `'numeric-dot'` is now `'digits-dot'`.
    * `options` no longer accepts `noComma` and `timeSeparator`.
* `COUNTRY_CODES2` **const** renamed to `COUNTRY_CODESIA2`.
* `COUNTRY_CODES3` **const** renamed to `COUNTRY_CODESIA3`.
* `CountryName` **type** renamed to `Country`.
* Removed `CountryCodes` **type**.
* (global) `exceptions` **parameter** renamed to `exclusions`.

#### New
`valsAreEqual` Check if two values are equal, with options for excluding properties, setting traverse behaviour, and configuring how arrays and functions are compared.\
`funcsAreEqual` Check if two functions are equal, with options for configuring comparison strictness.\
`objHasKey` Search an object for a specific (property) key.\
`objHasVal` Search an object for a specific (property) value.\
`arrsMerge` Merge two or more arrays.\
`arrFlatten` Flatten a single array containing arrays and so on, with options for removing duplicates.\
`isArray` Check if x is an array.\
`isObject` Check if x is an object.\
`dateParse` Alias for `parseDate`.\
`datesAreEqual` Check if two dates are equal.\
`timeFormat` Alias for `formatTime`.\
`generateId` Alias for `genId`.\
`CountryIA2` Type for country two-letter ISO code.\
`CountryIA3` Type for country three-letter ISO code.


#### Improvements
`arrsAreEqual` (formerly `arraysEqual`) Options for comparison strategies and configuring traverse behaviour.\
`objsAreEqual` (formerly `objIsEqual`) Options for allowing exceptions, configuring traverse behaviour, and changing how arrays and functions are compared.\
`objToQueryString` (formerly `paramOptionsToString`) Support for arrays and nested objects, and options for configuration.\
`objRemoveProps` Option to check nested objects for props to remove.\
`objCamelifyKeys` Convert nested objects by default.\
`objSnakeifyKeys` Convert nested objects by default.\
`objKeyFromVal` Option for checking nested objects.\
`objExtractKeys` Options for including nested objects, returning
a flat list, and removing duplicates.\
`strCapitalise` Option for capitalising all words.\
All date functions now accept JS timestamps (or [milliseconds since UNIX expoch]((https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now))) in addition to Date objects and ISO stings.\
Countries: Support for Aland Islands, Antarctica, American Samoa, Bouvet Island, Libya, Macau, Saint Pierre & Miquelon, and Syria.
`generateId` Options for configuring if/how to use crypto.\
`secsToMins` Accept strings.\
`wait` Accept strings.\
`calculateSeconds` Accept strings.\
Date functions prefixed with `date`, eg `dateFormat`.\
Time functions prefixed with `time`.\
Beautilities no longer depends on (the amazing) [date-fns](https://date-fns.org/)

...and lots of improvements to descriptions, typo fixes, and internal refactoring.

