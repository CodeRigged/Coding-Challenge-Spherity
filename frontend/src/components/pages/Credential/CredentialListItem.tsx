import type { Credential } from "shared/types"

import VerifiedIcon from "@mui/icons-material/Verified"
import { Box, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"

import DeleteButton from "./buttons/DeleteButton"
import VerifyButton from "./buttons/VerifyButton"
import ViewButton from "./buttons/ViewButton"

interface CredentialListItemProps {
  credential: Credential
}

const CredentialListItem = ({ credential }: CredentialListItemProps) => {
  const isValid = credential.verified

  return (
    <Card className="credential-list__item" variant="outlined">
      <CardContent className="credential-list__item-content">
        <Box className="credential-list__item-header">
          <Typography variant="subtitle2" color="text.secondary">
            {credential.type}
          </Typography>
          <Chip
            label={isValid ? "Verified" : "Not Verified"}
            color={isValid ? "success" : "warning"}
            size="small"
            icon={<VerifiedIcon />}
            sx={{ ml: 1 }}
            aria-label={isValid ? "Credential verified" : "Credential not verified"}
          />
        </Box>
        <Typography variant="body1" gutterBottom>
          Issuer: {credential.issuer}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Subject: {credential.subject}
        </Typography>
      </CardContent>
      <CardActions className="credential-list__item-actions">
        <VerifyButton credential={credential} verified={isValid} />
        <ViewButton credential={credential} />
        <DeleteButton credential={credential} />
      </CardActions>
    </Card>
  )
}

export default CredentialListItem
