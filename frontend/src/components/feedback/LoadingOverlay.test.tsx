import { cleanup, render, screen } from "@testing-library/react"
import { act } from "react"

import LoadingOverlay from "~/components/feedback/LoadingOverlay"
import { useAppStore } from "~/stores/index"
import { PendingState } from "~/stores/state-handlers"

const expectedText = "Loading..."

/**
 * Helper to setup the LoadingOverlay component with optional pending state.
 * @param {Partial<PendingState>} appState - The pending state to set in the store.
 * @returns The result of rendering the LoadingOverlay component.
 */
const setup = (appState: Partial<PendingState> = { isPending: false, text: null }) => {
  act(() => useAppStore.setState(appState))
  return render(<LoadingOverlay />)
}

afterEach(() => {
  cleanup()
  useAppStore.setState({ isPending: false, text: null })
})

describe("LoadingOverlay", () => {
  it("renders overlay and text when isPending is true", () => {
    setup({ isPending: true, text: expectedText })

    expect(screen.getByRole("progressbar", { hidden: true })).toBeInTheDocument()
    expect(screen.getByTestId("loading-text")).toBeInTheDocument()
    expect(screen.getByTestId("loading-text")).toHaveTextContent(expectedText)
  })

  it("does not render overlay when isPending is false", () => {
    setup({ isPending: false, text: expectedText })

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
  })

  it("does not render Typography when text is null", () => {
    setup({ isPending: true, text: null })

    expect(screen.queryByTestId("loading-text")).not.toBeInTheDocument()
    expect(screen.getByRole("progressbar", { hidden: true })).toBeInTheDocument()
  })
})
