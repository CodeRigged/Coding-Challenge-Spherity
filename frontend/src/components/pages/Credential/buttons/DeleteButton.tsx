import DeleteIcon from "@mui/icons-material/Delete"
import { IconButton, Tooltip } from "@mui/material"
import { useState } from "react"
import { Credential } from "shared/types"

import { useCredentialStore } from "~/stores/credential-store"
import { useErrorStore } from "~/stores/state-handlers"

import DeleteConfirmDialog from "../dialogs/DeleteConfirmDialog"

interface DeleteButtonProps {
  credential: Credential
}

const DeleteButton = ({ credential }: DeleteButtonProps) => {
  const { deleteCredential, isPending } = useCredentialStore()
  const { setError } = useErrorStore()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    setShowDeleteConfirm(false)
    await deleteCredential(credential._id).catch(setError)
  }

  return (
    <>
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
    </>
  )
}

export default DeleteButton
