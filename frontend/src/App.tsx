import { CssBaseline, ThemeProvider } from "@mui/material"
import { IntlProvider } from "react-intl"
import { RouterProvider } from "react-router-dom"
import { Locales } from "shared/types"

import { useLocaleLoader } from "./i18n"
import router from "./router"
import { useAppTheme } from "./theme"

/**
 * Main application component that sets up theming, internationalization, and routing.
 *
 * @returns {JSX.Element} The main application component.
 */
function App() {
  const theme = useAppTheme()
  const { messages, selectedLocale } = useLocaleLoader()

  return (
    <IntlProvider messages={messages} locale={selectedLocale} defaultLocale={Locales.ENGLISH}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
