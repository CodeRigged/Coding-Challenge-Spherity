import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import Joi from "joi"
import { LoggerModule } from "nestjs-pino"

import { HealthModule } from "./base/health.module.js"
import { loggerOptions } from "./config/logger.js"
import { CredentialModule } from "./models/credential/credential.module.js"

/**
 * The root module of the application.
 * Sets up MongoDB connection and imports feature modules.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
      }),
    }),
    LoggerModule.forRoot(loggerOptions),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    HealthModule,
    CredentialModule,
  ],
})
export class AppModule {}
