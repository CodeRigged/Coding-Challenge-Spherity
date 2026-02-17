import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import request from "supertest"
import { afterAll, beforeAll, describe, it, vi } from "vitest"

import { CredentialController } from "./credential.controller.js"
import { CredentialService } from "./credential.service.js"

describe("CredentialController (e2e)", () => {
  let app: INestApplication
  const credentialService = {
    findAll: vi
      .fn()
      .mockResolvedValue([
        { _id: "1", claims: { name: "Alice" }, issuer: "Issuer", jwt: "jwt-token", subject: "Subject", type: "Test" },
      ]),
    findOne: vi.fn().mockResolvedValue({
      _id: "1",
      claims: { name: "Alice" },
      issuer: "Issuer",
      jwt: "jwt-token",
      subject: "Subject",
      type: "Test",
    }),
    issueCredential: vi.fn().mockResolvedValue({
      _id: "1",
      claims: { name: "Alice" },
      issuer: "Issuer",
      jwt: "jwt-token",
      subject: "Subject",
      type: "Test",
    }),
    remove: vi.fn().mockResolvedValue({ _id: "1" }),
    verifyCredential: vi.fn().mockResolvedValue({ payload: { sub: "Subject" }, valid: true }),
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CredentialController],
      providers: [{ provide: CredentialService, useValue: credentialService }],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it("/credentials/issue (POST) should issue a credential", async () => {
    await request(app.getHttpServer())
      .post("/credentials/issue")
      .send({ claims: { name: "Alice" }, issuer: "Issuer", subject: "Subject", type: "Test" })
      .expect(201)
      .expect({
        _id: "1",
        claims: { name: "Alice" },
        issuer: "Issuer",
        jwt: "jwt-token",
        subject: "Subject",
        type: "Test",
      })
  })

  it("/credentials (GET) should return all credentials", async () => {
    await request(app.getHttpServer())
      .get("/credentials")
      .expect(200)
      .expect([
        { _id: "1", claims: { name: "Alice" }, issuer: "Issuer", jwt: "jwt-token", subject: "Subject", type: "Test" },
      ])
  })

  it("/credentials/verify (POST) should verify a credential", async () => {
    await request(app.getHttpServer())
      .post("/credentials/verify")
      .send({ jwt: "jwt-token" })
      .expect(201)
      .expect({ payload: { sub: "Subject" }, valid: true })
  })

  it("/credentials/:id (GET) should fetch a credential by id", async () => {
    await request(app.getHttpServer())
      .get("/credentials/1")
      .expect(200)
      .expect({
        claims: { name: "Alice" },
        issuer: "Issuer",
        jwt: "jwt-token",
        subject: "Subject",
        type: "Test",
      })
  })

  it("/credentials/:id (DELETE) should delete a credential", async () => {
    credentialService.findOne.mockResolvedValueOnce({ _id: "1" })
    credentialService.remove.mockResolvedValueOnce({ _id: "1" })
    await request(app.getHttpServer()).delete("/credentials/1").expect(200).expect({ deleted: true })
  })
})
