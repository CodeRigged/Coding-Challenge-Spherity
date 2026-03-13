import { Box, Stack, Typography } from "@mui/material"
import { FormattedMessage, useIntl } from "react-intl"

import LinkButton from "~/components/inputs/buttons/LinkButton"
import PageLayout from "~/layouts/PageLayout"

import { CredentialRoutes } from "../../router/routes"

/**
 * LandingPage component
 *
 * Displays the dashboard landing page with a welcome message and navigation buttons.
 * Users can navigate to create a new credential or view all credentials using the provided buttons.
 * Uses react-intl for translations and Material UI for layout.
 *
 * @component
 * @returns {JSX.Element} The rendered landing page.
 */
const LandingPage = () => {
  const { formatMessage } = useIntl()

  return (
    <PageLayout documentTitle={formatMessage({ defaultMessage: "Dashboard", id: "pages.dashboard.title" })}>
      <Box
        display="flex"
        flexDirection="column"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
      >
        <Typography variant="h4" gutterBottom>
          <FormattedMessage id="pages.dashboard.welcome" defaultMessage="Welcome to the Credential Dashboard" />
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          <FormattedMessage id="pages.dashboard.description" defaultMessage="Manage and issue credentials easily." />
        </Typography>
        <Stack direction={{ sm: "row", xs: "column" }} spacing={3}>
          <LinkButton
            label={formatMessage({ defaultMessage: "Create New Credential", id: "pages.dashboard.createButton" })}
            variant="contained"
            color="primary"
            size="large"
            to={CredentialRoutes.NEW}
          />
          <LinkButton
            label={formatMessage({ defaultMessage: "View All Credentials", id: "pages.dashboard.viewButton" })}
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
