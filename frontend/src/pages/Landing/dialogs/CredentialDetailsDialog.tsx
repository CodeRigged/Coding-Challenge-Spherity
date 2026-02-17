import type { Credential, Nullable } from "shared/types"

import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"

interface CredentialDetailsDialogProps {
  credential: Nullable<Credential>
  open: boolean
  onClose: () => void
}

const CredentialDetailsDialog = ({ credential, onClose, open }: CredentialDetailsDialogProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Credential Details</DialogTitle>
    <DialogContent>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="subtitle2" flex={1}>
          JSON
        </Typography>
        <Tooltip title="Copy JSON">
          <IconButton
            onClick={async () => {
              if (credential) await navigator.clipboard.writeText(JSON.stringify(credential, null, 2))
            }}
            size="small"
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <TextField
        value={credential ? JSON.stringify(credential, null, 2) : ""}
        multiline
        fullWidth
        minRows={10}
        slotProps={{ input: { readOnly: true } }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
)

export default CredentialDetailsDialog
