import type { Credential } from "shared/types"

import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import VerifiedIcon from "@mui/icons-material/Verified"
import { Box, Card, CardContent, CardHeader, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { useParams } from "react-router-dom"

import BackButton from "~/components/navigation/BackButton"
import { useCredentialStore } from "~/stores/credential-store"

const CredentialPage = () => {
  const intl = useIntl()
  const { id } = useParams<{ id: string }>()
  const { findCredential, isPending } = useCredentialStore()
  const [credential, setCredential] = useState<Credential | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (id) {
      findCredential(id as unknown as Credential["_id"])
        .then(res => {
          if (res instanceof Error) setError(res.message)
          else setCredential(res)
        })
        .catch(e => setError(String(e)))
    }
  }, [id, findCredential])

  const handleCopy = async () => {
    if (credential) {
      await navigator.clipboard.writeText(JSON.stringify(credential, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }
  }

  if (isPending) return <CircularProgress sx={{ display: "block", mt: 6, mx: "auto" }} />
  if (error) return <Typography color="error">{error}</Typography>
  if (!credential)
    return (
      <Typography>
        <FormattedMessage id="pages.credential.details.notFound" />
      </Typography>
    )

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Card sx={{ boxShadow: 4, maxWidth: 700, width: "100%" }}>
        <CardHeader
          avatar={<BackButton />}
          title={
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h6">
                <FormattedMessage id="pages.credential.details.title" />
              </Typography>
              {credential.verified ? (
                <Tooltip title={<FormattedMessage id="common.verified" />}>
                  <VerifiedIcon color="success" />
                </Tooltip>
              ) : (
                <Tooltip title={<FormattedMessage id="common.notVerified" />}>
                  <VerifiedIcon color="warning" />
                </Tooltip>
              )}
            </Box>
          }
          action={
            <Tooltip
              title={copied ? <FormattedMessage id="buttons.copied" /> : <FormattedMessage id="buttons.copyJson" />}
            >
              <IconButton onClick={handleCopy} aria-label={intl.formatMessage({ id: "buttons.copyJson" })}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            <FormattedMessage id="common.type" />: {credential.type}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <FormattedMessage id="common.issuer" />: {credential.issuer}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <FormattedMessage id="common.subject" />: {credential.subject}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mt={2} mb={1}>
            <FormattedMessage id="common.rawJson" />
          </Typography>
          <Box
            mb={2}
            sx={{
              border: "1px solid",
              borderRadius: 2,
              fontSize: 14,
              maxHeight: 400,
              overflowX: "auto",
              padding: 2,
              whiteSpace: "pre",
            }}
          >
            <pre style={{ fontFamily: "Fira Mono, Menlo, monospace", margin: 0, whiteSpace: "pre" }}>
              {JSON.stringify(credential, null, 2)}
            </pre>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CredentialPage
