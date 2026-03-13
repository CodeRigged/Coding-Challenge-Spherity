import VerifiedIcon from "@mui/icons-material/Verified"
import { IconButton, Tooltip } from "@mui/material"
import React, { useState } from "react"
import { useIntl } from "react-intl"
import { Credential, Nullable, VerifyCredentialResult } from "shared/types"

import { useCredentialStore } from "~/stores/credential-store"

import VerifyDialog from "../dialogs/VerifyDialog"

/**
 * Props for VerifyButton component.
 */
interface VerifyButtonProps {
  credential: Credential
  setVerified: React.Dispatch<React.SetStateAction<Credential["verified"]>>
  verified: boolean
}

/**
 * VerifyButton component for verifying a credential.
 *
 * Renders a button that triggers a verification action for the given credential.
 *
 * @param credential - The credential to verify
 * @param verified - Whether the credential is already verified
 * @param setVerified - Function to update the verified state of the credential
 */
const VerifyButton: React.FC<VerifyButtonProps> = ({ credential, setVerified, verified }) => {
  const intl = useIntl()
  const { isPending, verifyCredential } = useCredentialStore()
  const [showVerify, setShowVerify] = useState<boolean>(false)
  const [verifyResult, setVerifyResult] = useState<Nullable<VerifyCredentialResult>>(null)

  const handleVerify = async () => {
    setShowVerify(true)
    const result = await verifyCredential(credential.jwt)
    setVerifyResult(result)
    setVerified(result.valid)
  }

  return (
    <>
      <Tooltip title={intl.formatMessage({ defaultMessage: "Verify", id: "buttons.verify" })}>
        <IconButton
          onClick={handleVerify}
          disabled={isPending || verified}
          aria-label={intl.formatMessage({ defaultMessage: "Verify", id: "buttons.verify" })}
        >
          <VerifiedIcon />
        </IconButton>
      </Tooltip>
      <VerifyDialog
        open={showVerify}
        isPending={isPending}
        onClose={() => setShowVerify(false)}
        verifyResult={verifyResult}
      />
    </>
  )
}

export default VerifyButton
