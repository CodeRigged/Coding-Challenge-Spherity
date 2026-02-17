import type { IssueCredentialDto } from "shared/types"

import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from "@nestjs/common"

import { CredentialService } from "./credential.service.js"

@Controller("credentials")
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}


  /**
   * Issue a new credential.
   * @param {IssueCredentialDto} body - The credential data to issue
   * @returns {Promise<Credential>} The issued credential document
   */
  @Post("issue")
  async issue(
    @Body()
    { claims, issuer, subject, type }: IssueCredentialDto
  ) {
    return this.credentialService.issueCredential(type, issuer, subject, claims)
  }


  /**
   * Get all credentials in the wallet.
   * @returns {Promise<Credential[]>} Array of credential documents
   */
  @Get()
  async list() {
    return this.credentialService.findAll()
  }


  /**
   * Verify a credential JWT.
   * @param {{ jwt: string }} body - The JWT to verify
   * @returns {Promise<{ payload?: unknown; valid: boolean; error?: string }>} Verification result
   */
  @Post("verify")
  async verify(@Body() body: { jwt: string }) {
    return this.credentialService.verifyCredential(body.jwt)
  }


  /**
   * Fetch a credential by its ID.
   * @param {string} id - The ID of the credential
   * @returns {Promise<Credential>} The found credential document
   * @throws {NotFoundException} If the credential is not found
   */
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const credential = await this.credentialService.findOne(id)
    if (!credential) throw new NotFoundException("Credential not found")

    const { claims, issuer, jwt, subject, type } = credential
    return { claims, issuer, jwt, subject, type }
  }


  /**
   * Delete a credential by its ID.
   * @param {string} id - The ID of the credential to delete
   * @returns {Promise<{ deleted: boolean }>} Deletion status
   * @throws {NotFoundException} If the credential is not found
   */
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const deleted = await this.credentialService.remove(id)
    if (!deleted) throw new NotFoundException("Credential not found")
    return { deleted: true }
  }
}
