import VisibilityIcon from "@mui/icons-material/Visibility"
import { Tooltip } from "@mui/material"
import { useIntl } from "react-intl"
import { Credential } from "shared/types"

import LinkIconButton from "~/components/inputs/buttons/LinkIconButton"
import { useCredentialStore } from "~/stores/credential-store"

interface ViewButtonProps {
  credential: Credential
}

const ViewButton = ({ credential }: ViewButtonProps) => {
  const intl = useIntl()
  const { isPending } = useCredentialStore()

  return (
    <Tooltip title={intl.formatMessage({ defaultMessage: "View", id: "buttons.view" })}>
      <LinkIconButton
        to={`/credential/${credential._id}`}
        disabled={isPending}
        aria-label={intl.formatMessage({ defaultMessage: "View", id: "buttons.view" })}
        Icon={VisibilityIcon}
      />
    </Tooltip>
  )
}

export default ViewButton
