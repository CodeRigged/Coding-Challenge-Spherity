import { fireEvent, render, screen } from "@testing-library/react"
import { act } from "react"

import SelectBox, { SelectBoxOption } from "./SelectBox"

const options: SelectBoxOption<string>[] = [
  { label: "Option 1", value: "opt1" },
  { hint: "Hint for option 2", label: "Option 2", value: "opt2" },
  { label: "Option 3", value: "opt3" },
]

/**
 * Helper to setup the SelectBox component with required props.
 * @param {Partial<React.ComponentProps<typeof SelectBox>>} props - Props to override defaults.
 * @returns The result of rendering the SelectBox component with specified props.
 */
const setup = (props: Partial<React.ComponentProps<typeof SelectBox>> = {}) => {
  return render(<SelectBox label="Select" options={options} selected="opt1" onChange={vi.fn()} {...props} />)
}

describe("SelectBox", () => {
  it("renders with label", () => {
    setup()
    expect(screen.getByLabelText("Select")).toBeInTheDocument()
  })

  it("renders all options", () => {
    setup()
    act(() => {
      fireEvent.mouseDown(screen.getByRole("combobox"))
    })
    const optionElements = screen.getAllByRole("option")
    expect(optionElements).toHaveLength(options.length)
    options.forEach((option, idx) => {
      expect(optionElements[idx]).toHaveTextContent(option.label)
    })
  })

  it("renders with no selected option", () => {
    setup({ selected: "null" })
    expect(screen.getByRole("combobox")).toHaveValue("")
  })

  it("renders with empty options", () => {
    setup({ options: [], selected: null })
    act(() => {
      fireEvent.mouseDown(screen.getByRole("combobox"))
    })
    expect(screen.queryAllByRole("option")).toHaveLength(0)
  })

  it("shows hint for selected option", () => {
    setup({ selected: "opt2" })
    expect(screen.getByText("Hint for option 2")).toBeInTheDocument()
  })

  it("calls onChange when option is selected", () => {
    const handleChange = vi.fn()
    setup({ onChange: handleChange })
    act(() => {
      fireEvent.mouseDown(screen.getByRole("combobox"))
    })
    const optionElements = screen.getAllByRole("option")
    const option3 = optionElements.find(opt => opt.textContent === "Option 3")
    act(() => {
      fireEvent.click(option3!)
    })
    expect(handleChange).toHaveBeenCalled()
  })
})
