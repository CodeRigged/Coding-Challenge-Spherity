import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Nullable } from "shared/types"
import { v4 as uuidv4 } from "uuid"

import { Credential, CredentialDocument } from "./credential.schema.js"

@Injectable()
export class CredentialService {
  constructor(
    @InjectModel(Credential.name) private credentialModel: Model<CredentialDocument>,
    private jwtService: JwtService
  ) {}

  /**
   * Issue a new credential, sign it as a JWT, and store it in the database.
   * @param {string} type - The type of the credential
   * @param {string} issuer - The issuer of the credential
   * @param {string} subject - The subject of the credential
   * @param {Record<string, unknown>} claims - The claims to include in the credential
   * @returns {Promise<Credential>} The issued credential document
   */
  async issueCredential(type: string, issuer: string, subject: string, claims: Record<string, unknown>) {
    const payload = {
      claims,
      iat: Math.floor(Date.now() / 1000),
      iss: issuer,
      jti: uuidv4(),
      sub: subject,
      type,
    }
    const jwt = this.jwtService.sign(payload)
    const credential = new this.credentialModel({ claims, issuer, jwt, subject, type })
    return credential.save()
  }

  /**
   * Verify a credential JWT and return its payload if valid.
   * @param {string} jwt - The JWT to verify
   * @returns {Promise<{ payload?: unknown; valid: boolean; error?: string }>} Verification result
   */
  async verifyCredential(jwt: string) {
    try {
      const payload = this.jwtService.verify(jwt)
      return { payload, valid: true }
    } catch (e: unknown) {
      if (e instanceof Error) {
        return { error: e.message, valid: false }
      }
      return { error: "Unknown error", valid: false }
    }
  }

  /**
   * Fetch all credentials from the database.
   * @returns {Promise<Credential[]>} Array of credential documents
   */
  async findAll(): Promise<Credential[]> {
    return this.credentialModel.find().sort({ createdAt: "desc" })
  }

  /**
   * Find a credential by its ID.
   * @param {string} id - The ID of the credential to find
   * @returns {Promise<Nullable<Credential>>} The found credential document, or null if not found
   */
  async findOne(id: string): Promise<Nullable<Credential>> {
    return this.credentialModel.findById(id)
  }

  /**
   * Delete a credential by its ID.
   * @param {string} id - The ID of the credential to delete
   * @returns {Promise<Nullable<Credential>>} The deleted credential document, or null if not found
   */
  async remove(id: string): Promise<Nullable<Credential>> {
    return this.credentialModel.findByIdAndDelete(id)
  }
}
