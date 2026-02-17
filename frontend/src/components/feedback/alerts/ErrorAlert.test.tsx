import { cleanup, fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { act } from "react"
import { Nullable } from "shared/types"

import AppAlert from "~/components/feedback/alerts/ErrorAlert"
import { useErrorStore } from "~/stores/state-handlers"

import { autoHideDuration } from "./ErrorAlert.constants"

const error = { message: "Something went wrong!", name: "TestError" }

/**
 * Helper to setup the AppAlert component with optional error state.
 * @param {Nullable<Error>} errorState - The error object or null.
 * @return {RenderResult} The result of rendering the AppAlert component.
 */
const setup = (errorState: Nullable<Error> = null) => {
  act(() => {
    useErrorStore.setState({ error: errorState })
  })
  return render(<AppAlert />)
}

afterEach(() => {
  cleanup()
  useErrorStore.setState({ error: null })
})

describe("AppAlert", () => {
  it("renders and displays error message when error is set", () => {
    setup(error)
    expect(screen.getByText(error.name)).toBeInTheDocument()
    expect(screen.getByText(error.message)).toBeInTheDocument()
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("does not render when error is null", () => {
    setup()
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
  })

  it("closes when close button is clicked", async () => {
    setup(error)
    expect(screen.getByRole("alert")).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByLabelText(/close/i))
    })

    await waitForElementToBeRemoved(() => screen.queryByRole("alert"))
  })

  it("auto-hides after duration", async () => {
    vi.useFakeTimers()

    setup(error)
    expect(screen.getByRole("alert")).toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(autoHideDuration + 500)
      // Advance past auto-hide duration because of transition time
    })

    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    vi.useRealTimers()
  })
})
