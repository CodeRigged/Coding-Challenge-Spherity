import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"

import { CredentialController } from "./credential.controller.js"
import { Credential, CredentialSchema } from "./credential.schema.js"
import { CredentialService } from "./credential.service.js"

@Module({
  controllers: [CredentialController],
  imports: [
    MongooseModule.forFeature([{ name: Credential.name, schema: CredentialSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1y" },
      }),
    }),
  ],
  providers: [CredentialService],
})
export class CredentialModule {}
