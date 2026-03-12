import VisibilityIcon from "@mui/icons-material/Visibility"
import { Tooltip } from "@mui/material"
import { Credential } from "shared/types"

import LinkIconButton from "~/components/inputs/buttons/LinkIconButton"
import { useCredentialStore } from "~/stores/credential-store"

interface ViewButtonProps {
  credential: Credential
}

const ViewButton = ({ credential }: ViewButtonProps) => {
  const { isPending } = useCredentialStore()

  return (
    <Tooltip title="View Details">
      <LinkIconButton
        to={`/credential/${credential._id}`}
        disabled={isPending}
        aria-label="View Details"
        Icon={VisibilityIcon}
      />
    </Tooltip>
  )
}

export default ViewButton
