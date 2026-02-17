import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"

import { middleware } from "./app.middleware.js"
import { AppModule } from "./app.module.js"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  middleware(app)

  await app.listen(process.env.PORT || 5000)
}
bootstrap()
