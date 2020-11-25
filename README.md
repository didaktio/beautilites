# Beautilities
A lightweight set of handy utilities for Javascript and Typescript.

## Usage
Beautilities can be used in both node and browser environments. Install it using npm:\
`npm install beautilities`.

There are three ways to access the functions:
###### Top-level (Standard Import)
`import { valsAreEqual, generateId, formatDate } from 'beautilities';`

###### Just-in-time (Dynamic Import)
`const { valsAreEqual } = await import('beautilities');`

###### Kitchen Sink (Namespace Import)
`import * as beut from 'beautilities';` (not recommended in production).

Types are bundled, as are `.map` files for help with debugging.

## Overview
Javascript is awesome. It's a dynamic, powerful, and most importantly, fun language. It rules the web. And thanks to ECMAScript and Typescript, its evolution continues. It has a slew of fantastic general and specific utility libraries, like:
* [Lodash](https://lodash.com)
* [date-fns](https://date-fns.org)
* [Math.js](https://mathjs.org)
* [Ramda](https://ramdajs.com)
* [spacetime](https://github.com/spencermountain/spacetime)

and so on.

To these we can add Beautilities: a set of very handy functions for commonplace requirements like comparing objects, merging data sets, converting casing (of a string, or every key in an **n**-nested object), capitalising strings, parsing and formatting dates, working with currencies, simple wait functions, generating strong IDs, and so on. This is an ultra-lightweight library that'll save you time, energy, and bytes. Beautilities is also an ever-evolving project; there are no doubt more things to add, just as in time there will be things to take away. Such is the nature of software.

## Structure
Containing the following modules, Beautilities' source is arranged very simplistically:
* arrays (Manipulation and comparison for arrays.)
* objects (Manipulation and comparison for objects.)
* functions (Manipulation and comparison for functions.)
* strings (Manipulation and comparison for strings.)
* countries (Built-in data and useful functions for working with country names and codes.)
* currencies (Built-in data and useful functions for working with currencies.)
* datetime (Conversion, formatting, and parsing functions for dates and times.)
* id (Generating random IDs of defined length, using crytpo is available.)
* misc (Set of functions without an appropriate catch-all namespace.)
* typescript (Functions and types that address Typescript deficiencies.)


Everything is commented and strong-typed. Very handy is the naming convention of functions:
- Simple yet extremely revealing names. For example, it's crystal clear the functions `arrsAreEqual`, `objToQueryString`, and `isDomainOrUrl`, `objSnakeifyKeys`, and `wait` do. Misnomers are exhausting, and often unconsciously so.
- Prefixes for functions ~specific to data of type **x**. For example, all string manipulation functions begin with `str`, all arrays with `arr`, and all object functions with `obj`. Your code editor's intellisense will present a popup as soon as you type the prefix and you'll be able to quickly select the required function.

### Popular Functions
`formatDate` Beautify a date object or timestamp.\
`formatTime` Convert a date into human-readable time.\
`parseDate` Convert a timestamp or ISO to a JS date object.\
`objMerge` Deeply merge objects, including arrays.\
`valsAreEqual` Check if two values are equal, with support for all data types.\
`strSnakeToCamel` Convert snake_case string to camelCase.\
`strCapitalise` Capitalise the first letter of a string.\
`countryToCode` Convert a country full name to its ISO two- or three-letter code.\
`isObject` Check if value is a key-value object.\
`objSnakeifyKeys` Convert all keys in an object to snakeCasing.\
`objsAreEqual` Check if two objects are equal.\
`objToQueryString` Convert an object of parameters to a query string.\
`objOmitProps` Omit specific properties from an object by key names.\
`objKeyFromVal` Get a property's key name from it's value.\
`objFlatten` Completely flatten an object, regardless of nesting.\
`arrsAreEqual` Check if two or more arrays are equal.\
`arrsMerge` Merge two or more arrays.\
`getCurrency` Get useful information about a currency such as the symbol, plural name, and decimal points.\
`generateId` Generate a strong ID. [Crypto](https://nodejs.org/api/crypto.html) will be used if available (e.g., in Node.js).\
`wait` A simple promise which resolves after a defined number of seconds.\
`isDomainOrURL` Check whether a string is a domain or a URL.

### Real-world Usage
Beautilities is used by several companies from a range of different domains. The growing list includes [PrestoKast](https://prestokast.com), [MyPT](https://mypt.co), [Hamperess](https://hamperess.com), [Didakt.io](https://didakt.io), and
[The Todo App](https://thetodoapp.com).