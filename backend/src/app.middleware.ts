import type { INestApplication } from "@nestjs/common"

import bodyParser from "body-parser"
import cors from "cors"
export function middleware(app: INestApplication): INestApplication {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  return app
}
