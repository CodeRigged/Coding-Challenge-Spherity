/* eslint-disable no-console */
const logger = {
  error: (message: string) => {
    if (process.env.NODE_ENV !== "production") {
      console.error(`[ERROR] ${new Date().toISOString()}: ${message}`)
    }
  },

  info: (message: string) => {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[INFO] ${new Date().toISOString()}: ${message}`)
    }
  },

  log: (message: string) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[LOG] ${new Date().toISOString()}: ${message}`)
    }
  },

  warn: (message: string) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[WARN] ${new Date().toISOString()}: ${message}`)
    }
  },
}

export default logger
