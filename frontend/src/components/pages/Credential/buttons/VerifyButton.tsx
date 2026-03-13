import VerifiedIcon from "@mui/icons-material/Verified"
import { IconButton, Tooltip } from "@mui/material"
import React, { useState } from "react"
import { useIntl } from "react-intl"
import { Credential, Nullable, VerifyCredentialResult } from "shared/types"

import { useCredentialStore } from "~/stores/credential-store"

import VerifyDialog from "../dialogs/VerifyDialog"

interface VerifyButtonProps {
  credential: Credential
  verified: boolean
}

const VerifyButton = React.memo<VerifyButtonProps>(({ credential, verified }) => {
  const intl = useIntl()
  const { isPending, verifyCredential } = useCredentialStore()
  const [showVerify, setShowVerify] = useState(false)
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
