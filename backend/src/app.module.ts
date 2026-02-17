import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import * as dotenv from "dotenv"
import { LoggerModule } from "nestjs-pino"

import { HealthModule } from "./base/health.module.js"
import { loggerOptions } from "./config/logger.js"
import { TodoModule } from "./models/todo/todo.module.js"

dotenv.config()

/**
 * The root module of the application.
 * Sets up MongoDB connection and imports feature modules.
 */
@Module({
  imports: [
    LoggerModule.forRoot(loggerOptions),
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb://localhost:27017/todos"),
    HealthModule,
    TodoModule,
  ],
})
export class AppModule {}
