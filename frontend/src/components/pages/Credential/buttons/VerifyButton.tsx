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
  verified: boolean
}

/**
 * VerifyButton component for verifying a credential.
 *
 * Renders a button that triggers a verification action for the given credential.
 *
 * @param credential - The credential to verify
 * @param verified - Whether the credential is already verified
 */
const VerifyButton = React.memo<VerifyButtonProps>(({ credential, verified }) => {
  const intl = useIntl()
  const { isPending, verifyCredential } = useCredentialStore()
  const [showVerify, setShowVerify] = useState<boolean>(false)
  const [verifyResult, setVerifyResult] = useState<Nullable<VerifyCredentialResult>>(null)

  const handleVerify = async () => {
    setShowVerify(true)
    const result = await verifyCredential(credential.jwt)
    setVerifyResult(result)
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
})

export default VerifyButton
