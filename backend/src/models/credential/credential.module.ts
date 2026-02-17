import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"

import { CredentialController } from "./credential.controller.js"
import { Credential, CredentialSchema } from "./credential.schema.js"
import { CredentialService } from "./credential.service.js"

@Module({
  controllers: [CredentialController],
  imports: [
    MongooseModule.forFeature([{ name: Credential.name, schema: CredentialSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: "1y" },
    }),
  ],
  providers: [CredentialService],
})
export class CredentialModule {}
