import { useIntl } from "react-intl"

import Tabs, { TabType } from "~/components/navigation/Tabs"
import PageLayout from "~/layouts/PageLayout"

import AdvancedTab from "./AdvancedTab"
import GeneralTab from "./GeneralTab"

const SettingsPage = () => {
  const { formatMessage } = useIntl()

  const tabs: TabType[] = [
    {
      content: <GeneralTab />,
      label: formatMessage({ defaultMessage: "General", id: "pages.settings.tabs.general.title" }),
    },
    {
      content: <AdvancedTab />,
      label: formatMessage({ defaultMessage: "Advanced", id: "pages.settings.tabs.advanced.title" }),
    },
  ]
  return (
    <PageLayout documentTitle={formatMessage({ defaultMessage: "Settings", id: "pages.settings.title" })}>
      <Tabs tabs={tabs} />
    </PageLayout>
  )
}
export default SettingsPage
