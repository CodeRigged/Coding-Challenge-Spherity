import type { ObjectId } from "mongodb"

export interface CredentialJWTPayload {
  /**
   * The credential claims (arbitrary JSON object)
   */
  claims: Record<string, unknown>
  /**
   * Issued at (seconds since Unix epoch)
   */
  iat: number
  /**
   * Issuer identifier (DID, URI, etc.)
   */
  iss: string
  /**
   * JWT ID (unique identifier for this JWT)
   */
  jti: string
  /**
   * Subject identifier (DID, URI, etc.)
   */
  sub: string
  /**
   * Credential type
   */
  type: string
}

export interface IssueCredentialDto {
  claims: Record<string, unknown>
  issuer: string
  subject: string
  type: string
}
export interface Credential extends IssueCredentialDto {
  _id: ObjectId
  jwt: string
}
