import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { FormattedMessage } from "react-intl"
import { Nullable, VerifyCredentialResult } from "shared/types"
interface VerifyDialogProps {
  isPending: boolean
  open: boolean
  verifyResult: Nullable<VerifyCredentialResult>
  onClose: () => void
}

const VerifyDialog = ({ isPending, onClose, open, verifyResult }: VerifyDialogProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>
      <FormattedMessage id="pages.credential.dialogs.verifyTitle" defaultMessage="Verify Credential" />
    </DialogTitle>
    <DialogContent>
      {isPending ? (
        <Typography>
          <FormattedMessage id="pages.credential.dialogs.verifyPending" defaultMessage="Verifying..." />
        </Typography>
      ) : verifyResult ? (
        verifyResult.valid ? (
          <Typography color="success.main">
            <FormattedMessage id="pages.credential.dialogs.verifyValid" defaultMessage="Credential is valid" />
          </Typography>
        ) : (
          <Typography color="error.main">
            <FormattedMessage
              id="pages.credential.dialogs.verifyInvalid"
              defaultMessage="Invalid: {error}"
              values={{ error: verifyResult.error }}
            />
          </Typography>
        )
      ) : (
        <Typography>
          <FormattedMessage id="pages.credential.dialogs.verifyUnexpected" defaultMessage="Unexpected state" />
        </Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>
        <FormattedMessage id="buttons.close" defaultMessage="Close" />
      </Button>
    </DialogActions>
  </Dialog>
)

export default VerifyDialog
