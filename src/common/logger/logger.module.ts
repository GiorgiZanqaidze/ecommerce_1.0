// src/common/logger/logger.module.ts
import { Module } from "@nestjs/common";
import { CustomLoggerService } from "./custom-logger.service";

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService], // Export the logger service
})
export class LoggerModule {}
