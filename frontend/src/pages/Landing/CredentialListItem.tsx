import type { Credential } from "shared/types"

import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import DeleteIcon from "@mui/icons-material/Delete"
import VerifiedIcon from "@mui/icons-material/Verified"
import VisibilityIcon from "@mui/icons-material/Visibility"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import { useState } from "react"

import { useCredentialStore } from "~/stores/credential-store"
import { useErrorStore } from "~/stores/state-handlers"

interface CredentialListItemProps {
  credential: Credential
}

const CredentialListItem = ({ credential }: CredentialListItemProps) => {
  const { deleteCredential, findCredential, isPending, verifyCredential } = useCredentialStore()
  const { setError } = useErrorStore()
  const [showDetails, setShowDetails] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [verifyResult, setVerifyResult] = useState<null | { valid: boolean; payload?: unknown; error?: string }>(null)

  const handleDelete = async () => {
    await deleteCredential(credential._id).catch(setError)
  }

  const handleFetch = async () => {
    const data = await findCredential(credential._id)
    if (data && !("error" in data)) {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    } else {
      setError((data as any)?.error || "Unable to share credential")
    }
  }

  const handleVerify = async () => {
    setShowVerify(true)
    const result = await verifyCredential(credential.jwt)
    setVerifyResult(result)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {credential.type}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Issuer: {credential.issuer}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Subject: {credential.subject}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          JWT: {credential.jwt}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="View Details">
          <IconButton onClick={() => setShowDetails(true)} disabled={isPending}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share (copy JSON)">
          <IconButton onClick={handleFetch} disabled={isPending}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Verify">
          <IconButton onClick={handleVerify} disabled={isPending}>
            <VerifiedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete} disabled={isPending}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Dialog open={showDetails} onClose={() => setShowDetails(false)} maxWidth="md" fullWidth>
        <DialogTitle>Credential Details</DialogTitle>
        <DialogContent>
          <TextField
            value={JSON.stringify(credential, null, 2)}
            multiline
            fullWidth
            minRows={10}
            InputProps={{ readOnly: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showVerify} onClose={() => setShowVerify(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Verify Credential</DialogTitle>
        <DialogContent>
          {verifyResult ? (
            verifyResult.valid ? (
              <Typography color="success.main">Credential is valid</Typography>
            ) : (
              <Typography color="error.main">Invalid: {verifyResult.error}</Typography>
            )
          ) : (
            <Typography>Verifying...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowVerify(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default CredentialListItem
