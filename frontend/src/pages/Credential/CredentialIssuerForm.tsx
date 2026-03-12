import type { IssueCredentialDto, Nullable } from "shared/types"

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"

import BackButton from "~/components/navigation/BackButton"
import { useCredentialStore } from "~/stores/credential-store"
import { useErrorStore } from "~/stores/state-handlers"

import SuccessDialog from "../../components/pages/Credential/dialogs/SuccessDialog"

const initialForm: IssueCredentialDto = {
  claims: {},
  issuer: "",
  subject: "",
  type: "",
}

// Helper to validate JSON claims
const parseClaims = (input: string): Nullable<Record<string, unknown>> => {
  try {
    return JSON.parse(input)
  } catch {
    return null
  }
}

const CredentialIssuerForm = () => {
  const [form, setForm] = useState<IssueCredentialDto>(initialForm)
  const [claimsInput, setClaimsInput] = useState<string>("")
  const { addCredential, isPending } = useCredentialStore()
  const { setError } = useErrorStore()
  const [showSuccess, setShowSuccess] = useState(false)

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
        <CardHeader
          avatar={<BackButton />}
          title={
            <Typography marginBottom={0} variant="h6" gutterBottom>
              Issue New Credential
            </Typography>
          }
        />
        <CardContent>
          <Box component="form" onSubmit={handleAdd} display="flex" flexDirection="column" gap={2}>
            <FormControl disabled={isPending} required variant="outlined" size="small">
              <TextField
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Credential Type"
                label="Type"
                size="small"
                required
              />
              <FormHelperText>Type of credential (e.g. VerifiableCredential)</FormHelperText>
            </FormControl>
            <FormControl disabled={isPending} required variant="outlined" size="small">
              <TextField
                name="issuer"
                value={form.issuer}
                onChange={handleChange}
                placeholder="Issuer DID or Name"
                label="Issuer"
                size="small"
                required
              />
              <FormHelperText>Issuer's DID or name (e.g. did:example:issuer123)</FormHelperText>
            </FormControl>
            <FormControl disabled={isPending} required variant="outlined" size="small">
              <TextField
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject DID or Name"
                label="Subject"
                size="small"
                required
              />
              <FormHelperText>Subject's DID or name (e.g. did:example:subject456)</FormHelperText>
            </FormControl>
            <FormControl
              disabled={isPending}
              required
              variant="outlined"
              size="small"
              error={!!claimsInput && !parseClaims(claimsInput)}
            >
              <TextField
                name="claims"
                value={claimsInput}
                onChange={handleClaimsChange}
                placeholder='Claims (JSON, e.g. {"name":"Alice"})'
                label="Claims"
                size="small"
                required
                multiline
                minRows={2}
              />
              <FormHelperText>
                {!!claimsInput && !parseClaims(claimsInput)
                  ? "Invalid JSON format"
                  : "Paste or type JSON object for claims"}
              </FormHelperText>
            </FormControl>
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
      <SuccessDialog open={showSuccess} onClose={() => setShowSuccess(false)} />
    </Box>
  )
}

export default CredentialIssuerForm
