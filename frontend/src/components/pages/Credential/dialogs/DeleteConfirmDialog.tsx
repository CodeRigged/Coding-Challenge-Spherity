import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { FormattedMessage } from "react-intl"

interface DeleteConfirmDialogProps {
  isPending?: boolean
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteConfirmDialog = ({ isPending, onClose, onConfirm, open }: DeleteConfirmDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      <FormattedMessage id="pages.credential.dialogs.deleteTitle" defaultMessage="Delete Credential" />
    </DialogTitle>
    <DialogContent>
      <Typography>
        <FormattedMessage
          id="pages.credential.dialogs.deleteMessage"
          defaultMessage="Are you sure you want to delete this credential?"
        />
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={isPending}>
        <FormattedMessage id="buttons.cancel" defaultMessage="Cancel" />
      </Button>
      <Button onClick={onConfirm} color="error" disabled={isPending} autoFocus>
        <FormattedMessage id="buttons.delete" defaultMessage="Delete" />
      </Button>
    </DialogActions>
  </Dialog>
)

export default DeleteConfirmDialog
