import type { Credential } from "shared/types"

import VerifiedIcon from "@mui/icons-material/Verified"
import { Box, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import React from "react"
import { FormattedMessage, useIntl } from "react-intl"

import DeleteButton from "./buttons/DeleteButton"
import VerifyButton from "./buttons/VerifyButton"
import ViewButton from "./buttons/ViewButton"

interface CredentialListItemProps {
  credential: Credential
}

/**
 * CredentialListItem component for displaying a single credential.
 *
 * Renders a card with credential details and action buttons.
 *
 * @param credential - The credential to display
 */
const CredentialListItem = React.memo<CredentialListItemProps>(({ credential }) => {
  const intl = useIntl()
  const isValid = credential.verified

  return (
    <Card className="credential-list__item" variant="outlined">
      <CardContent className="credential-list__item-content">
        <Box className="credential-list__item-header">
          <Typography variant="subtitle2" color="text.secondary">
            <FormattedMessage id="common.type" defaultMessage="Type" />: {credential.type}
          </Typography>
          <Chip
            label={
              isValid ? (
                <FormattedMessage id="common.verified" defaultMessage="Verified" />
              ) : (
                <FormattedMessage id="common.notVerified" defaultMessage="Not Verified" />
              )
            }
            color={isValid ? "success" : "warning"}
            size="small"
            icon={<VerifiedIcon />}
            sx={{ ml: 1 }}
            aria-label={
              isValid
                ? intl.formatMessage({ defaultMessage: "Credential verified", id: "common.verified" })
                : intl.formatMessage({ defaultMessage: "Credential not verified", id: "common.notVerified" })
            }
          />
        </Box>
        <Typography variant="body1" gutterBottom>
          <FormattedMessage id="common.issuer" defaultMessage="Issuer" />: {credential.issuer}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <FormattedMessage id="common.subject" defaultMessage="Subject" />: {credential.subject}
        </Typography>
      </CardContent>
      <CardActions className="credential-list__item-actions">
        <VerifyButton credential={credential} verified={isValid} />
        <ViewButton credential={credential} />
        <DeleteButton credential={credential} />
      </CardActions>
    </Card>
  )
})

export default CredentialListItem
