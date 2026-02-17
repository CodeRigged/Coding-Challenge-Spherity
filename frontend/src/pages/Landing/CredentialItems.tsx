import { Stack, Typography } from "@mui/material"

import { useCredentialStore } from "~/stores/credential-store"

import CredentialListItem from "./CredentialListItem"

const CredentialItems = () => {
  const { credentials, isPending } = useCredentialStore()
  return (
    <Stack spacing={2}>
      {credentials.map(credential => (
        <CredentialListItem key={credential._id as string} credential={credential} />
      ))}
      {credentials.length === 0 && !isPending && (
        <Typography align="center" color="text.secondary" mt={2}>
          No credentials issued yet.
        </Typography>
      )}
    </Stack>
  )
}

export default CredentialItems
