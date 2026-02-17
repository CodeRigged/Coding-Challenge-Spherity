import { Tab, Tabs } from "@mui/material"
import { Dispatch, SetStateAction, SyntheticEvent } from "react"

import { Selected, TabType } from "./"

interface PanelHeaderProps {
  selected: Selected
  setSelected: Dispatch<SetStateAction<Selected>>
  tabs: TabType[]
}

/**
 * Renders the header panel for a tabbed interface.
 *
 * @param {PanelHeaderProps} props - The props object containing the selected tab, a function to set the selected tab, and an array of tabs.
 * @param {Selected} props.selected - The currently selected tab.
 * @param {Dispatch<SetStateAction<Selected>>} props.setSelected - A function to set the selected tab.
 * @param {TabType[]} props.tabs - An array of tabs to render in the header panel.
 * @return {JSX.Element} The rendered header panel.
 */
const PanelHeader = ({ selected, setSelected, tabs }: PanelHeaderProps) => {
  const handleChange = (_e: SyntheticEvent, newValue: Selected) => {
    setSelected(newValue)
  }

  return (
    <Tabs value={selected} onChange={handleChange} aria-label="tabpanel">
      {tabs.map(({ label }) => (
        <Tab id={`tab-${label}`} key={`tab-${label}`} aria-controls={`tabpanel-${label}`} label={label} />
      ))}
    </Tabs>
  )
}
export default PanelHeader
