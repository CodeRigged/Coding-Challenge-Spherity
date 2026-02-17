import { Controller, Get } from "@nestjs/common"
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from "@nestjs/terminus"

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongooseIndicator: MongooseHealthIndicator
  ) {}

  /**
   * Health check endpoint for the application and MongoDB connection.
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.mongooseIndicator.pingCheck("mongodb")])
  }
}
