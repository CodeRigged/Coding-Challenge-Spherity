import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

interface DeleteConfirmDialogProps {
  isPending?: boolean
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteConfirmDialog = ({ isPending, onClose, onConfirm, open }: DeleteConfirmDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete Credential</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to delete this credential?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={isPending}>
        Cancel
      </Button>
      <Button onClick={onConfirm} color="error" disabled={isPending} autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
)

export default DeleteConfirmDialog
