import type { Credential } from "shared/types"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import VerifiedIcon from "@mui/icons-material/Verified"
import { Box, Card, CardContent, CardHeader, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useCredentialStore } from "~/stores/credential-store"

const CredentialPage = () => {
  const { id } = useParams<{ id: string }>()
  const { findCredential, isPending } = useCredentialStore()
  const [credential, setCredential] = useState<Credential | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

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
  if (!credential) return <Typography>No credential found.</Typography>

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Card sx={{ boxShadow: 4, maxWidth: 700, width: "100%" }}>
        <CardHeader
          avatar={
            <IconButton onClick={() => navigate(-1)} aria-label="Back">
              <ArrowBackIcon />
            </IconButton>
          }
          title={
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h6">Credential Details</Typography>
              {credential.verified && (
                <Tooltip title="Verified">
                  <VerifiedIcon color="success" fontSize="small" />
                </Tooltip>
              )}
            </Box>
          }
          action={
            <Tooltip title={copied ? "Copied!" : "Copy JSON"}>
              <IconButton onClick={handleCopy} aria-label="Copy JSON">
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Type: {credential.type}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Issuer: {credential.issuer}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Subject: {credential.subject}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mt={2} mb={1}>
            Raw JSON
          </Typography>
          <Box
            mb={2}
            sx={{
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
