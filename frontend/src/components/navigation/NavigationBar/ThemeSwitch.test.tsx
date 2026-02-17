import { PaletteOptions, ThemeProvider, createTheme } from "@mui/material/styles"
import { fireEvent, render, screen } from "@testing-library/react"

import * as stores from "~/stores/index"

import ThemeSwitch from "./ThemeSwitch"

/**
 * Sets up the ThemeSwitch component wrapped with a MUI ThemeProvider using the specified palette mode.
 * @param {PaletteOptions["mode"]} mode - The palette mode to use for the theme ("light" or "dark"). Defaults to "light".
 * @returns The result of rendering the ThemeSwitch component with the specified theme.
 */
const setupWithTheme = (mode: PaletteOptions["mode"] = "light") => {
  const theme = createTheme({ palette: { mode } })
  return render(
    <ThemeProvider theme={theme}>
      <ThemeSwitch />
    </ThemeProvider>
  )
}

describe("ThemeSwitch", () => {
  it("renders DarkModeIcon when theme is light", () => {
    setupWithTheme()
    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument()
  })

  it("renders LightModeIcon when theme is dark", () => {
    setupWithTheme("dark")
    expect(screen.getByTestId("LightModeIcon")).toBeInTheDocument()
  })

  it("calls toggleMode when clicked", () => {
    const toggleMode = vi.fn()
    vi.spyOn(stores, "useThemeStore").mockReturnValue({ toggleMode })
    setupWithTheme("light")
    const iconButton = screen.getByRole("button")
    fireEvent.click(iconButton)
    expect(toggleMode).toHaveBeenCalled()
  })
})
