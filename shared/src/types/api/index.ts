import { CredentialJWTPayload } from "../index.js"

/**
 * Result type for credential verification.
 */
export interface VerifyCredentialResult {
  error?: string
  payload?: CredentialJWTPayload
  valid: boolean
}
