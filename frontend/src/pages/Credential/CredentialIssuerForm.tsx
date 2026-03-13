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
import { FormattedMessage, useIntl } from "react-intl"

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

// Helper to validate JSON claims (must be object)
const parseClaims = (input: string): Nullable<Record<string, unknown>> => {
  try {
    const parsed = JSON.parse(input)
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

/**
 * CredentialIssuerForm component for issuing new credentials.
 *
 * Provides a form for entering credential details and claims, handles validation and submission.
 * Shows success dialog on completion.
 */
const CredentialIssuerForm = () => {
  const { formatMessage } = useIntl()
  const [form, setForm] = useState<IssueCredentialDto>(initialForm)
  const [claimsInput, setClaimsInput] = useState<string>("")
  const { addCredential, isPending } = useCredentialStore()
  const { setError } = useErrorStore()
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

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
              <FormattedMessage id="pages.credential.issuer.title" defaultMessage="Issue New Credential" />
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
                placeholder={formatMessage({
                  defaultMessage: "Credential Type",
                  id: "pages.credential.issuer.typePlaceholder",
                })}
                label={formatMessage({ defaultMessage: "Type", id: "common.type" })}
                size="small"
                required
              />
              <FormHelperText>
                <FormattedMessage
                  id="pages.credential.issuer.typeHelper"
                  defaultMessage="Type of credential (e.g. VerifiableCredential)"
                />
              </FormHelperText>
            </FormControl>
            <FormControl disabled={isPending} required variant="outlined" size="small">
              <TextField
                name="issuer"
                value={form.issuer}
                onChange={handleChange}
                placeholder={formatMessage({ defaultMessage: "Issuer DID or Name", id: "common.issuer" })}
                label={formatMessage({ defaultMessage: "Issuer", id: "common.issuer" })}
                size="small"
                required
              />
              <FormHelperText>
                <FormattedMessage
                  id="pages.credential.issuer.issuerHelper"
                  defaultMessage="Issuer's DID or name (e.g. did:example:issuer123)"
                />
              </FormHelperText>
            </FormControl>
            <FormControl disabled={isPending} required variant="outlined" size="small">
              <TextField
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder={formatMessage({
                  defaultMessage: "Subject DID or Name",
                  id: "pages.credential.issuer.subjectPlaceholder",
                })}
                label={formatMessage({ defaultMessage: "Subject", id: "common.subject" })}
                size="small"
                required
              />
              <FormHelperText>
                <FormattedMessage
                  id="pages.credential.issuer.subjectHelper"
                  defaultMessage="Subject's DID or name (e.g. did:example:subject456)"
                />
              </FormHelperText>
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
                placeholder={formatMessage({
                  defaultMessage: 'Claims (JSON, e.g. {"name":"Alice"})',
                  id: "pages.credential.issuer.claimsPlaceholder",
                })}
                label={formatMessage({ defaultMessage: "Claims", id: "common.claims" })}
                size="small"
                required
                multiline
                minRows={2}
              />
              <FormHelperText>
                {!!claimsInput && !parseClaims(claimsInput)
                  ? formatMessage({
                      defaultMessage: "Invalid JSON format or not an object",
                      id: "pages.credential.issuer.invalidJson",
                    })
                  : formatMessage({
                      defaultMessage: "Paste or type JSON object for claims",
                      id: "pages.credential.issuer.claimsHelper",
                    })}
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
                {isPending
                  ? formatMessage({ defaultMessage: "Issuing...", id: "pages.credential.issuer.issuing" })
                  : formatMessage({ defaultMessage: "Issue Credential", id: "pages.credential.issuer.issueButton" })}
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
