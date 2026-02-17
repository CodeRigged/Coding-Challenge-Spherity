import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"

import { useCredentialStore } from "~/stores/credential-store"
import { useErrorStore } from "~/stores/state-handlers"

import CredentialForm from "./CredentialForm"
import CredentialItems from "./CredentialItems"

const CredentialList = () => {
  const { fetchCredentials, isPending, text: pendingMessage } = useCredentialStore()
  const { setError } = useErrorStore()

  useEffect(() => {
    fetchCredentials().catch(setError)
  }, [fetchCredentials, setError])

  return (
    <Box maxWidth={640} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom align="center">
        Issued Credentials
      </Typography>
      <CredentialForm />
      {isPending && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={32} />
          {pendingMessage && (
            <Typography ml={2} color="text.secondary">
              {pendingMessage}
            </Typography>
          )}
        </Box>
      )}
      <CredentialItems />
    </Box>
  )
}

export default CredentialList
