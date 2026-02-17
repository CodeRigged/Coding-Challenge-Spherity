import { useEffect, useState } from "react"
import { Locales } from "shared/types"

import { useAppStore, useLocaleStore } from "~/stores/index"
import logger from "~/utils/logger"

import { flattenObject } from "../utils"
import defaultLocale from "./json/en-US.json"

/**
 * Helper function to dynamically import locale data.
 *
 * @param {Locales} locale - The selected locale.
 * @return {Promise<object>} - The imported locale data.
 */
const importLocaleData = async (locale: Locales) => {
  try {
    return await import(`./json/${locale}.json`)
  } catch {
    logger.warn(`Locale "${locale}" not found. Falling back to default.`)
    return { default: defaultLocale } // Fallback to defaultLocale
  }
}

/**
 * Custom hook to load messages based on the selected locale.
 *
 * @return {Object} An object containing messages and selectedLocale.
 */
export const useLocaleLoader = () => {
  const { selectedLocale } = useLocaleStore()
  const { setIsPending } = useAppStore()
  const [messages, setMessages] = useState<Record<string, string>>(flattenObject(defaultLocale))

  useEffect(() => {
    const loadLocale = async () => {
      setIsPending(true)
      try {
        const data = await importLocaleData(selectedLocale)
        setMessages(flattenObject(data.default))
      } finally {
        setIsPending(false)
      }
    }

    loadLocale()
  }, [selectedLocale, setIsPending])

  return { messages, selectedLocale }
}
