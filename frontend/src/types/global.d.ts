import "vite/client"

import defaultLocale from "../i18n/json/en-US.json"
import { DotPaths } from "./utils"

// Enables type-safe ids for React Intl FormattedMessage components
declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: DotPaths<typeof defaultLocale>
    }
  }
}
