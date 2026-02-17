import HomeIcon from "@mui/icons-material/Home"
import { IconButtonProps } from "@mui/material"
import { fireEvent, render, screen } from "@testing-library/react"
import { act } from "react"
import { MemoryRouter } from "react-router-dom"

import LinkIconButton from "~/components/inputs/buttons/LinkIconButton"

const to = "/icon-link"

/**
 * Helper to setup the LinkIconButton component with required props.
 * @param {IconButtonProps & { "data-testid"?: string }} props - Props to override defaults.
 * @returns The result of rendering the LinkIconButton component with specified props.
 */
const setup = (props: IconButtonProps & { "data-testid"?: string } = {}) => {
  return render(
    <MemoryRouter>
      <LinkIconButton Icon={HomeIcon} to={to} aria-label="home" {...props} />
    </MemoryRouter>
  )
}

describe("LinkIconButton", () => {
  it("renders as a link with correct href", () => {
    setup()
    const iconLinkButton = screen.getByRole("link", { name: /home/i })
    expect(iconLinkButton).toBeInTheDocument()
    expect(iconLinkButton).toHaveAttribute("href", to)
  })

  it("renders the provided icon", () => {
    setup()
    // HomeIcon renders an SVG with data-testid="HomeIcon"
    expect(screen.getByTestId("HomeIcon")).toBeInTheDocument()
  })

  it("passes additional props to IconButton", () => {
    setup({ color: "primary", "data-testid": "icon-link-btn" })
    const iconLinkButton = screen.getByTestId("icon-link-btn")
    expect(iconLinkButton).toBeInTheDocument()
    expect(iconLinkButton).toHaveClass("MuiIconButton-root MuiIconButton-colorPrimary")
  })

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn()
    setup({ "data-testid": "clickable-btn", onClick: handleClick })
    const iconLinkButton = screen.getByTestId("clickable-btn")
    act(() => {
      fireEvent.click(iconLinkButton)
    })
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
