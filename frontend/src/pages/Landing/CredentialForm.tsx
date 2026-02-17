import type { IssueCredentialDto } from "shared/types"

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
  const [claimsInput, setClaimsInput] = useState("")
  const { addCredential, isPending } = useCredentialStore()
  const { setError } = useErrorStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleClaimsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClaimsInput(e.target.value)
    try {
      setForm({ ...form, claims: JSON.parse(e.target.value) })
    } catch {
      // ignore parse error, show on submit
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!form.type || !form.issuer || !form.subject || !claimsInput) throw new Error("All fields required")
      JSON.parse(claimsInput) // validate claims
      await addCredential(form)
      setForm(initialForm)
      setClaimsInput("")
    } catch (err) {
      setError((err as Error).message)
    }
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
        error={
          !!claimsInput &&
          (() => {
            try {
              JSON.parse(claimsInput)
              return false
            } catch {
              return true
            }
          })()
        }
        helperText={
          !!claimsInput &&
          (() => {
            try {
              JSON.parse(claimsInput)
              return ""
            } catch {
              return "Invalid JSON"
            }
          })()
        }
      />
      <Button type="submit" variant="contained" color="primary" disabled={isPending}>
        Issue Credential
      </Button>
    </Box>
  )
}

export default CredentialForm
