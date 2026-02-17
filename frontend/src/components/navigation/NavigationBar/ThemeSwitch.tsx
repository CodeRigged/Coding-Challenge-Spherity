import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import IconButton from "@mui/material/IconButton"
import { useTheme } from "@mui/material/styles"

import { useThemeStore } from "~/stores/index"

/**
 * Theme switch component that toggles between light and dark mode.
 *
 * @return {JSX.Element} The IconButton component with LightMode or DarkMode based on the current theme.
 */
const ThemeSwitch = () => {
  const theme = useTheme()
  const { toggleMode } = useThemeStore()
  return (
    <IconButton onClick={toggleMode}>
      {theme.palette.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  )
}

export default ThemeSwitch
