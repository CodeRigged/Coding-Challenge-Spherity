/**
 * A utility function to make API requests to the backend.
 *
 * @param path The API endpoint path.
 * @param options Optional fetch options.
 * @returns A promise that resolves to the fetch response.
 */
export function apiFetch(path: string, options?: RequestInit) {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, options)
}
