import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined"
import { Box, Stack, Typography } from "@mui/material"
import { FormattedMessage } from "react-intl"

import { useCredentialStore } from "~/stores/credential-store"

import CredentialListItem from "./CredentialListItem"

/**
 * CredentialItems component for displaying a list of credentials.
 *
 * Renders a stack of CredentialListItem components for each credential.
 * Shows an empty state if no credentials are present.
 */
const CredentialItems = () => {
  const { credentials, isPending } = useCredentialStore()

  return (
    <Stack spacing={2} className="credential-list">
      {credentials.map(credential => (
        <CredentialListItem key={credential._id as unknown as string} credential={credential} />
      ))}
      {credentials.length === 0 && !isPending && (
        <Box className="credential-list__empty">
          <InsertDriveFileOutlinedIcon className="credential-list__empty-icon" />
          <Typography className="credential-list__empty-text">
            <FormattedMessage
              id="pages.credential.overview.noCredentials"
              defaultMessage="No credentials issued yet."
            />
          </Typography>
        </Box>
      )}
    </Stack>
  )
}

export default CredentialItems
