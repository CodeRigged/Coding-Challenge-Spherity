import { Divider, Typography } from "@mui/material"
import { FormattedMessage, useIntl } from "react-intl"
import { Locales } from "shared/types"

import SelectBox, { SelectBoxOption } from "~/components/inputs/select/SelectBox"
import SettingsSection from "~/components/pages/Settings/SettingsSection"
import { useLocaleStore } from "~/stores/index"

const GeneralTab = () => {
  const { formatMessage } = useIntl()
  const { selectedLocale, updateLocale } = useLocaleStore()

  const localeOptions: SelectBoxOption<Locales>[] = [
    { label: formatMessage({ defaultMessage: "English", id: "languages.en-US" }), value: Locales.ENGLISH },
    { label: formatMessage({ defaultMessage: "French", id: "languages.fr-FR" }), value: Locales.FRENCH },
    { label: formatMessage({ defaultMessage: "German", id: "languages.de-DE" }), value: Locales.GERMAN },
  ]

  return (
    <div>
      <Typography variant="h6">
        <FormattedMessage id="pages.settings.tabs.general.sections.locale" />
      </Typography>
      <Divider />
      <SettingsSection
        components={[
          <SelectBox
            label={<FormattedMessage id="pages.settings.tabs.general.sections.locale" defaultMessage="Language" />}
            selected={selectedLocale}
            options={localeOptions}
            onChange={(_event, selectedOption) => updateLocale(selectedOption?.value as Locales)}
          />,
        ]}
      />
    </div>
  )
}
export default GeneralTab
