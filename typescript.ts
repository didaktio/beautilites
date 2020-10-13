/**
* Omit a key from the interface or type. For unknown keys, use the OmitKey method.
* @param Model Interface or type.
*/
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
* Omit a unknown key. For known keys, use the Omit method.
* @param Model Interface or type.
*/
export type OmitKey<T, K extends string> = Pick<T, Exclude<keyof T, K>>;


/**
* Make all properties (at every level) optional. Does not work so well with arrays - try DeepOptional instead.
* @param Model Interface or type.
*/
export type Optional<T> = { [P in keyof T]?: Optional<T[P]> };


/**
* Make all properties (at every level) optional, except specific keys. Does not work so well with arrays - try DeepOptional instead.
* @param Model Interface or type.
*/
export type OptionalExcept<T, K extends keyof T> = Optional<T> & Pick<T, K>;


/**
* Make properties at every level optional, including arrays and other troublesome data types.
* @param Model Interface or type.
*/
export type DeepOptional<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepOptional<U>>
  : T[P] extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepOptional<U>>
  : DeepOptional<T[P]>
};


// /**
// * Adds immutable properties and alters particular fields to accept values only present on new documents.
// */
// export type Newify<T> = Omit<T, 'createdAt'> & {
//     documentMeta: { createdAt: FieldValue, path: string }
// };


/**
* (Firebase-specific) Alters particular fields to accept values that are compulsory when updating a document.
* @param T Interface or type.
*/
export type Updatable<T> = FieldValuable<OmitKey<T, 'createdAt'>>;


/**
* ***TODO!*** Make properties at every level optional and able to accept a Firestore FieldValue.
* @param Model Interface or type.
*/
export type FieldValuable<T> = {
  [P in keyof T]?: T[P];
}

export type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never });
