import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { Nullable, VerifyCredentialResult } from "shared/types"

interface VerifyDialogProps {
  isPending: boolean
  open: boolean
  verifyResult: Nullable<VerifyCredentialResult>
  onClose: () => void
}

const VerifyDialog = ({ isPending, onClose, open, verifyResult }: VerifyDialogProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Verify Credential</DialogTitle>
    <DialogContent>
      {isPending ? (
        <Typography>Verifying...</Typography>
      ) : verifyResult ? (
        verifyResult.valid ? (
          <Typography color="success.main">Credential is valid</Typography>
        ) : (
          <Typography color="error.main">Invalid: {verifyResult.error}</Typography>
        )
      ) : (
        <Typography>Unexpected state</Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
)

export default VerifyDialog
