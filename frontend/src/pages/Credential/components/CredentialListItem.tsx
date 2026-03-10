import type { Credential, Nullable, VerifyCredentialResult } from "shared/types"

import DeleteIcon from "@mui/icons-material/Delete"
import VerifiedIcon from "@mui/icons-material/Verified"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Box, Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography } from "@mui/material"
import { useState } from "react"

import LinkIconButton from "~/components/inputs/buttons/LinkIconButton"
import { useCredentialStore } from "~/stores/credential-store"
import { useErrorStore } from "~/stores/state-handlers"

import DeleteConfirmDialog from "./dialogs/DeleteConfirmDialog"
import VerifyDialog from "./dialogs/VerifyDialog"

interface CredentialListItemProps {
  credential: Credential
}

const CredentialListItem = ({ credential }: CredentialListItemProps) => {
  const { deleteCredential, isPending, verifyCredential } = useCredentialStore()
  const { setError } = useErrorStore()
  const [showVerify, setShowVerify] = useState<boolean>(false)
  const [verifyResult, setVerifyResult] = useState<Nullable<VerifyCredentialResult>>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)

  const isValid = credential.verified || verifyResult?.valid

  const handleVerify = async () => {
    setShowVerify(true)
    const result = await verifyCredential(credential.jwt)
    setVerifyResult(result)
  }

  const handleDelete = async () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    setShowDeleteConfirm(false)
    await deleteCredential(credential._id).catch(setError)
  }

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
        <Tooltip title="Verify Credential">
          <IconButton onClick={handleVerify} disabled={isPending || isValid} aria-label="Verify">
            <VerifiedIcon />
          </IconButton>
        </Tooltip>

        <VerifyDialog
          open={showVerify}
          isPending={isPending}
          onClose={() => setShowVerify(false)}
          verifyResult={verifyResult}
        />

        <Tooltip title="View Details">
          <LinkIconButton
            to={`/credential/${credential._id}`}
            disabled={isPending}
            aria-label="View Details"
            Icon={VisibilityIcon}
          />
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={handleDelete} disabled={isPending} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <DeleteConfirmDialog
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
          isPending={isPending}
        />
      </CardActions>
    </Card>
  )
}

export default CredentialListItem
