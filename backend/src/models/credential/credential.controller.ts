import type { IssueCredentialDto } from "shared/types"

import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from "@nestjs/common"

import { CredentialService } from "./credential.service.js"

@Controller("credentials")
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post("issue")
  async issue(
    @Body()
    { claims, issuer, subject, type }: IssueCredentialDto
  ) {
    return this.credentialService.issueCredential(type, issuer, subject, claims)
  }

  @Get()
  async list() {
    return this.credentialService.findAll()
  }

  @Post("verify")
  async verify(@Body() body: { jwt: string }) {
    return this.credentialService.verifyCredential(body.jwt)
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const credential = await this.credentialService.findOne(id)
    if (!credential) throw new NotFoundException("Credential not found")

    const { claims, issuer, jwt, subject, type } = credential
    return { claims, issuer, jwt, subject, type }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const deleted = await this.credentialService.remove(id)
    if (!deleted) throw new NotFoundException("Credential not found")
    return { deleted: true }
  }
}
