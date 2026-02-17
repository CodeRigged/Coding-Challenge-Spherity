import { render, screen } from "@testing-library/react"

import App from "../src/App"

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />)
    // Check for a visible element, e.g. logo or main container
    expect(screen.getByTestId("app-main-container")).toBeInTheDocument()
  })
})
