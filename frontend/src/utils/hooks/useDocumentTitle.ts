import { useEffect } from "react"

/**
 * Custom hook to update the document title.
 *
 * @param {string} title - The new title for the document.
 */
const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export default useDocumentTitle
