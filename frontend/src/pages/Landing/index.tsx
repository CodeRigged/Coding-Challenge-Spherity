import { Box, Stack, Typography } from "@mui/material"
import { useIntl } from "react-intl"

import LinkButton from "~/components/inputs/buttons/LinkButton"
import PageLayout from "~/layouts/PageLayout"

import { CredentialRoutes } from "../../router/routes"

const LandingPage = () => {
  const { formatMessage } = useIntl()

  return (
    <PageLayout documentTitle={formatMessage({ defaultMessage: "Dashboard", id: "pages.dashboard.title" })}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
        <Typography variant="h4" gutterBottom>
          Welcome to the Credential Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Manage and issue credentials easily.
        </Typography>
        <Stack direction={{ sm: "row", xs: "row" }} spacing={3}>
          <LinkButton
            label="Create New Credential"
            variant="contained"
            color="primary"
            size="large"
            to={CredentialRoutes.NEW}
          />
          <LinkButton
            label="View All Credentials"
            variant="contained"
            color="primary"
            size="large"
            to={CredentialRoutes.OVERVIEW}
          />
        </Stack>
      </Box>
    </PageLayout>
  )
}

export default LandingPage
