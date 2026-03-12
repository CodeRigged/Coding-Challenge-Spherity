import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined"
import { Box, Stack, Typography } from "@mui/material"

import { useCredentialStore } from "~/stores/credential-store"

import CredentialListItem from "./CredentialListItem"

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
          <Typography className="credential-list__empty-text">No credentials issued yet.</Typography>
        </Box>
      )}
    </Stack>
  )
}

export default CredentialItems
