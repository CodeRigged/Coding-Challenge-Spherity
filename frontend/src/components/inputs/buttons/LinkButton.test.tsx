import { ButtonProps } from "@mui/material"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import LinkButton from "~/components/inputs/buttons/LinkButton"

const label = "Go to page"
const to = "/test-link"

/**
 * Helper to setup the LinkButton component with required props.
 * @param {ButtonProps & { "data-testid"?: string }} props - Props to override defaults.
 */
const setup = (props: ButtonProps & { "data-testid"?: string } = {}) => {
  return render(
    <MemoryRouter>
      <LinkButton label={label} to={to} {...props} />
    </MemoryRouter>
  )
}

describe("LinkButton", () => {
  it("renders as a link with correct href and label", () => {
    setup()
    const linkButton = screen.getByRole("link", { name: label })
    expect(linkButton).toHaveAttribute("href", to)
    expect(linkButton).toHaveTextContent(label)
  })

  it("passes additional props to Button and renders with correct classes", () => {
    setup({ color: "primary", "data-testid": "link-btn" })
    const linkButton = screen.getByTestId("link-btn")
    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveClass("MuiButton-root MuiButton-textPrimary")
  })

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn()
    setup({ "data-testid": "clickable-btn", onClick: handleClick })
    const linkButton = screen.getByTestId("clickable-btn")
    act(() => {
      fireEvent.click(linkButton)
    })
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
