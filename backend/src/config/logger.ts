import { Params } from "nestjs-pino"

export const loggerOptions: Params = {
  pinoHttp: {
    level: process.env.LOG_LEVEL || "info",
    transport: {
      options: { colorize: true },
      target: "pino-pretty",
    },
  },
}
