# beautilities
Useful utilities for Javascript and Typescript.

## Usage
Beautilities can be used in both node and browser environments. Install it using npm:
`npm install beautilities`.

Types are bundled, as are .map files for help with debugging.

## Overview
Javascript is awesome. It's a dynamic, powerful, and most importantly, fun language. It rules the web. And thanks to ECMAScript and Typescript, its evolution continues. It has a slew of fantastic general and specific utility libraries, like:
* [Lodash](https://lodash.com/)
* [date-fns](https://date-fns.org/)
* [Math.js](https://mathjs.org/)
* [Ramda](https://ramdajs.com/)
* [spacetime](https://github.com/spencermountain/spacetime)

and so on. To these we can add *Beautilities*: a set of very handy functions for commonplace requirements like changing the casing of strings (and entire objects), comparing arrays, capitalising strings, parsing and
formatting dates, working with currencies, simple wait functions, generating IDs, and so on. This is an ultra-lightweight library that'll save you time, energy, and bytes. Beautilities is also an ever-evolving project;
there are no doubt more things to add, as in time there will be things to take away. Such is the nature of software.


## Structure
Containing the following modules, Beautilities is arranged very simplistically:
* array (Manipulation and comparison for arrays.)
* object (Manipulation and comparison for objects.)
* string (Manipulation and comparison for string.)
* countries (Built-in data and useful functions for working with country names and codes.)
* currencies (Built-in data and useful functions for working with currencies.)
* datetime (Conversion, formatting, and parsing functions for dates and times.)
* id (Generating random IDs of defined length, using crytpo is available.)
* typescript (Functions and types that address  Typescript deficiencies.)
* misc (Set of functions without an appropriate catch-all namespace.)

Everything is commented and strong-typed. Very handy is the naming convention of methods specific to data types; for example, all string manipulation function names begin with `str`. Your code editors intellisense will present a popup as soon as you type 'str', and you'll be able to quickly select the required function. The same goes for objects, e.g., `objCamelifyKeys`.

