interface NestedObject {
  [key: string]: string | NestedObject
}
type FlattendObject = Record<string, string>

/**
 * Recursively flattens a nested object of messages into a single-level object.
 *
 * @param {NestedObject} nestedMessages - The nested object of messages.
 * @param {string} [prefix=""] - The prefix to prepend to each key in the flattened object.
 * @return {FlattendObject} - The flattened object of messages.
 */
export const flattenObject = (nestedMessages: NestedObject, prefix = "") => {
  return Object.keys(nestedMessages).reduce<FlattendObject>((messages, key) => {
    const value = nestedMessages[key]
    const prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === "string") {
      messages[prefixedKey] = value
    } else {
      Object.assign(messages, flattenObject(value, prefixedKey))
    }

    return messages
  }, {})
}
