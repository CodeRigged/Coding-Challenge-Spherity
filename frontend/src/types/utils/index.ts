/**
 * Generates dot-separated string paths for all string properties and nested objects within type `T`.
 * - For string properties, includes the property key as a path.
 * - For object properties, recursively generates dot paths for nested string properties.
 * - Excludes properties that are not strings or objects.
 *
 * @template T - The type to generate dot paths for.
 */
export type DotPaths<T> = {
  [K in keyof T]: T[K] extends string
    ? K & string // Include if the value is a string
    : T[K] extends Record<string, object | string>
      ? `${K & string}.${DotPaths<T[K]>}` // Recurse if the value is an object
      : never // Exclude other types
}[keyof T]
