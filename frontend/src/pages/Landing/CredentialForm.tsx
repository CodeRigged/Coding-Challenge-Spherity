import type { IssueCredentialDto, Nullable } from "shared/types"

import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"

import { useCredentialStore } from "~/stores/credential-store"
import { useErrorStore } from "~/stores/state-handlers"

const initialForm: IssueCredentialDto = {
  claims: {},
  issuer: "",
  subject: "",
  type: "",
}

const CredentialForm = () => {
  const [form, setForm] = useState<IssueCredentialDto>(initialForm)
  const [claimsInput, setClaimsInput] = useState<string>("")
  const { addCredential, isPending } = useCredentialStore()
  const { setError } = useErrorStore()

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
      })
      .catch(setError)
  }

  return (
    <Box component="form" onSubmit={handleAdd} mb={3} display="flex" flexDirection="column" gap={2}>
      <TextField
        name="type"
        value={form.type}
        onChange={handleChange}
        placeholder="Credential Type"
        label="Type"
        disabled={isPending}
        size="small"
        required
      />
      <TextField
        name="issuer"
        value={form.issuer}
        onChange={handleChange}
        placeholder="Issuer DID or Name"
        label="Issuer"
        disabled={isPending}
        size="small"
        required
      />
      <TextField
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Subject DID or Name"
        label="Subject"
        disabled={isPending}
        size="small"
        required
      />
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
        helperText={!!claimsInput && !parseClaims(claimsInput) ? "Invalid JSON" : ""}
      />
      <Button type="submit" variant="contained" color="primary" disabled={isPending || !isFormValid}>
        Issue Credential
      </Button>
    </Box>
  )
}

export default CredentialForm
