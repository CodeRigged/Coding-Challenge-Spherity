import { ChildComponent } from "~/types/common"

import { Selected } from "./"

interface TabPanelProps extends ChildComponent {
  index: number
  value: Selected
}

/**
 * Renders the content of a tab panel based on the selected value.
 *
 * @param {TabPanelProps} props - The props object containing the index, value, and children.
 * @param {number} props.index - The index of the tab panel.
 * @param {Selected} props.value - The selected value.
 * @param {ReactNode} props.children - The content to be rendered inside the tab panel.
 * @param {...any} props.other - Additional props to be spread on the div element.
 * @return {JSX.Element | null} The rendered tab panel or null if the value does not match the index.
 */
const TabPanel = ({ children, index, value, ...other }: TabPanelProps) => {
  return value === index ? (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  ) : null
}
export default TabPanel
