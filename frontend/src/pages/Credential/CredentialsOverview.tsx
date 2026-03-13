import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"
import { useIntl } from "react-intl"
import { CredentialRoutes } from "router/routes"

import LinkButton from "~/components/inputs/buttons/LinkButton"
import BackButton from "~/components/navigation/BackButton"
import PageLayout from "~/layouts/PageLayout"
import { useCredentialStore } from "~/stores/credential-store"
import { useErrorStore } from "~/stores/state-handlers"

import CredentialItems from "../../components/pages/Credential/CredentialItems"

const CredentialsOverview = () => {
  const { disableSpinner, fetchCredentials, isPending, text: pendingMessage } = useCredentialStore()
  const { setError } = useErrorStore()
  const { formatMessage } = useIntl()

  useEffect(() => {
    fetchCredentials().catch(setError)
  }, [fetchCredentials, setError])

  return (
    <PageLayout
      documentTitle={formatMessage({ defaultMessage: "Issued Credentials", id: "pages.credential.overview.title" })}
    >
      <Box maxWidth={640} mx="auto" my={4} px={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <BackButton />
          <LinkButton
            label={formatMessage({
              defaultMessage: "Create New Credential",
              id: "pages.credential.overview.createButton",
            })}
            variant="contained"
            color="primary"
            to={CredentialRoutes.NEW}
          />
        </Box>
        {isPending && !disableSpinner && (
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
