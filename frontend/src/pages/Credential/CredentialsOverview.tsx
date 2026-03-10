import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"

import PageLayout from "~/layouts/PageLayout"
import { useCredentialStore } from "~/stores/credential-store"
import { useErrorStore } from "~/stores/state-handlers"

import CredentialItems from "./components/CredentialItems"

const CredentialsOverview = () => {
  const { fetchCredentials, isPending, text: pendingMessage } = useCredentialStore()
  const { setError } = useErrorStore()

  useEffect(() => {
    fetchCredentials().catch(setError)
  }, [fetchCredentials, setError])

  return (
    <PageLayout documentTitle="Issued Credentials">
      <Box maxWidth={640} mx="auto" my={4} px={2}>
        {isPending && (
          <Box display="flex" justifyContent="center" alignItems="center" my={2} gap={2}>
            <CircularProgress size={32} />
            {pendingMessage && <Typography color="text.secondary">{pendingMessage}</Typography>}
          </Box>
        )}
        <CredentialItems />
      </Box>
    </PageLayout>
  )
}

export default CredentialsOverview
