import { createTheme } from "@mui/material"
import { useMemo } from "react"

import { useThemeStore } from "../stores"

/**
 * Hook to get the current theme based on the mode set in the theme store.
 *
 * @returns {Theme} The current theme.
 */
export const useAppTheme = () => {
  const { mode } = useThemeStore()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )
  return theme
}
