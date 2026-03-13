import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import React from "react"
import { FormattedMessage } from "react-intl"
import { CredentialRoutes } from "router/routes"

import LinkButton from "~/components/inputs/buttons/LinkButton"

interface SuccessDialogProps {
  open: boolean
  onClose: () => void
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ onClose, open }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      <FormattedMessage id="pages.credential.dialogs.createdTitle" defaultMessage="Credential Created" />
    </DialogTitle>
    <DialogContent>
      <Typography gutterBottom>
        <FormattedMessage
          id="pages.credential.dialogs.createdMessage"
          defaultMessage="The credential was successfully created. What would you like to do next?"
        />
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" variant="outlined">
        <FormattedMessage id="pages.credential.dialogs.successCreateAnother" defaultMessage="Create Another" />
      </Button>
      <LinkButton
        to={CredentialRoutes.OVERVIEW}
        color="primary"
        variant="contained"
        label={<FormattedMessage id="pages.credential.dialogs.successGoToOverview" defaultMessage="Go to Overview" />}
      />
    </DialogActions>
  </Dialog>
)

export default SuccessDialog
