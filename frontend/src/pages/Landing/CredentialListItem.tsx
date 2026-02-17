import type { Credential, Nullable, VerifyCredentialResult } from "shared/types"

import DeleteIcon from "@mui/icons-material/Delete"
import VerifiedIcon from "@mui/icons-material/Verified"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Card, CardActions, CardContent, IconButton, Tooltip, Typography } from "@mui/material"
import { useState } from "react"

import { useCredentialStore } from "~/stores/credential-store"
import { useErrorStore } from "~/stores/state-handlers"

import CredentialDetailsDialog from "./dialogs/CredentialDetailsDialog"
import DeleteConfirmDialog from "./dialogs/DeleteConfirmDialog"
import VerifyDialog from "./dialogs/VerifyDialog"

interface CredentialListItemProps {
  credential: Credential
}

const CredentialListItem = ({ credential }: CredentialListItemProps) => {
  const { deleteCredential, findCredential, isPending, verifyCredential } = useCredentialStore()
  const { setError } = useErrorStore()
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [detailsData, setDetailsData] = useState<Nullable<Credential>>(null)
  const [showVerify, setShowVerify] = useState<boolean>(false)
  const [verifyResult, setVerifyResult] = useState<Nullable<VerifyCredentialResult>>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)

  const handleDelete = async () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    setShowDeleteConfirm(false)
    await deleteCredential(credential._id).catch(setError)
  }

  const fetchCredentialById = async () => {
    await findCredential(credential._id)
      .then(res => {
        if (!(res instanceof Error)) {
          setDetailsData(res)
          setShowDetails(true)
        }
      })
      .catch(setError)
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
      </CardContent>
      <CardActions>
        <Tooltip title="View Details">
          <IconButton onClick={fetchCredentialById} disabled={isPending}>
            <VisibilityIcon />
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
        <DeleteConfirmDialog
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
          isPending={isPending}
        />
      </CardActions>
      <CredentialDetailsDialog open={showDetails} onClose={() => setShowDetails(false)} credential={detailsData} />
      <VerifyDialog
        open={showVerify}
        isPending={isPending}
        onClose={() => setShowVerify(false)}
        verifyResult={verifyResult}
      />
    </Card>
  )
}

export default CredentialListItem
