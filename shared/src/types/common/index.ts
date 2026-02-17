import type { ObjectId } from "mongodb"

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
