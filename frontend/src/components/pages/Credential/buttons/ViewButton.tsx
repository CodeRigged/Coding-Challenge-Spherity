import VisibilityIcon from "@mui/icons-material/Visibility"
import { Tooltip } from "@mui/material"
import { useIntl } from "react-intl"
import { Credential } from "shared/types"

import LinkIconButton from "~/components/inputs/buttons/LinkIconButton"
import { useCredentialStore } from "~/stores/credential-store"

interface ViewButtonProps {
  credential: Credential
}
/**
 * Props for ViewButton component.
 */
interface ViewButtonProps {
  credential: Credential
}

/**
 * ViewButton component for viewing a credential.
 *
 * Renders a button that navigates to the credential details view.
 *
 * @param credential - The credential to view
 */
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
