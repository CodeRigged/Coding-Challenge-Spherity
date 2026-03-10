import type { IssueCredentialDto, Nullable } from "shared/types"

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { CredentialRoutes } from "router/routes"

import LinkButton from "~/components/inputs/buttons/LinkButton"
import { useCredentialStore } from "~/stores/credential-store"
import { useErrorStore } from "~/stores/state-handlers"

const initialForm: IssueCredentialDto = {
  claims: {},
  issuer: "",
  subject: "",
  type: "",
}

const CredentialIssuerForm = () => {
  const [form, setForm] = useState<IssueCredentialDto>(initialForm)
  const [claimsInput, setClaimsInput] = useState<string>("")
  const { addCredential, isPending } = useCredentialStore()
  const { setError } = useErrorStore()
  const [showSuccess, setShowSuccess] = useState(false)

  // Helper to validate JSON claims
  const parseClaims = (input: string): Nullable<Record<string, unknown>> => {
    try {
      return JSON.parse(input)
    } catch {
      return null
    }
  }

  const isFormValid = Boolean(form.type && form.issuer && form.subject && claimsInput && parseClaims(claimsInput))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClaimsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClaimsInput(e.target.value)
  }

  const handleAdd = async (e: React.SubmitEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    const claims = parseClaims(claimsInput) as Record<string, unknown>

    await addCredential({ ...form, claims })
      .then(() => {
        setForm(initialForm)
        setClaimsInput("")
        setShowSuccess(true)
      })
      .catch(setError)
  }

  return (
    <Box maxWidth={640} mx="auto" my={4} px={2}>
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Issue New Credential
          </Typography>
          <Box component="form" onSubmit={handleAdd} display="flex" flexDirection="column" gap={2}>
            <Tooltip title="Type of credential">
              <TextField
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Credential Type"
                label="Type"
                disabled={isPending}
                size="small"
                required
                helperText="e.g. VerifiableCredential"
              />
            </Tooltip>
            <Tooltip title="Issuer's DID or name (who issues the credential)">
              <TextField
                name="issuer"
                value={form.issuer}
                onChange={handleChange}
                placeholder="Issuer DID or Name"
                label="Issuer"
                disabled={isPending}
                size="small"
                required
                helperText="e.g. did:example:issuer123"
              />
            </Tooltip>
            <Tooltip title="Subject's DID or name (who receives the credential)">
              <TextField
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject DID or Name"
                label="Subject"
                disabled={isPending}
                size="small"
                required
                helperText="e.g. did:example:subject456"
              />
            </Tooltip>
            <Tooltip title='Claims (JSON, e.g. {"name":"Alice"})'>
              <TextField
                name="claims"
                value={claimsInput}
                onChange={handleClaimsChange}
                placeholder='Claims (JSON, e.g. {"name":"Alice"})'
                label="Claims"
                disabled={isPending}
                size="small"
                required
                multiline
                minRows={2}
                error={!!claimsInput && !parseClaims(claimsInput)}
                helperText={
                  !!claimsInput && !parseClaims(claimsInput)
                    ? "Invalid JSON format"
                    : "Paste or type JSON object for claims"
                }
              />
            </Tooltip>
            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2} mt={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isPending || !isFormValid}
                startIcon={isPending ? <CircularProgress size={18} color="inherit" /> : null}
              >
                {isPending ? "Issuing..." : "Issue Credential"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
        <DialogTitle>Credential Created</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>The credential was successfully created. What would you like to do next?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuccess(false)} color="primary" variant="outlined">
            Create Another
          </Button>
          <LinkButton to={CredentialRoutes.OVERVIEW} color="primary" variant="contained" label="Go to Overview" />
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CredentialIssuerForm
