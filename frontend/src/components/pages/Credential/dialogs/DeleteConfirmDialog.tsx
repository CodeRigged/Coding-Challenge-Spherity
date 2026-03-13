import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { FormattedMessage } from "react-intl"

/**
 * Props for DeleteConfirmDialog component.
 */
interface DeleteConfirmDialogProps {
  isPending?: boolean
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

/**
 * DeleteConfirmDialog component for confirming credential deletion.
 *
 * Renders a dialog to confirm deletion of a credential.
 *
 * @param isPending - Whether a delete operation is pending
 * @param open - Whether the dialog is open
 * @param onClose - Callback to close the dialog
 * @param onConfirm - Callback to confirm deletion
 */
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
