import Box from "@mui/material/Box"
import { ReactNode, useState } from "react"

import PanelHeader from "./PanelHeader"
import TabPanel from "./TabPanel"

export type Selected = string | number

export type TabType = {
  content: ReactNode
  label: string
}

interface TabsProps {
  tabs: TabType[]
}

/**
 * Renders a set of tabs with associated content.
 *
 * @param {TabsProps} props - The props object containing the tabs to render.
 * @param {TabType[]} props.tabs - An array of TabType objects representing the tabs to render.
 * @return {JSX.Element} The rendered Tabs component.
 */
const Tabs = ({ tabs }: TabsProps) => {
  const [selected, setSelected] = useState<Selected>(0)

  return (
    <Box>
      <PanelHeader selected={selected} setSelected={setSelected} tabs={tabs} />
      {tabs.map(({ content, label }, i) => (
        <TabPanel key={label} index={i} value={selected}>
          <div className="container">{content}</div>
        </TabPanel>
      ))}
    </Box>
  )
}
export default Tabs
