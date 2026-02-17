/**
 * Represents a type that can be either the specified type `T` or `null`.
 * Useful for indicating that a value may be absent.
 *
 * @template T - The type to make nullable.
 */
export type Nullable<T> = T | null
