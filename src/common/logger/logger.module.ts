// src/common/logger/logger.module.ts
import { Module } from "@nestjs/common";
import { CustomLoggerService } from "./custom-logger.service";
import { LoggerMiddleware } from "./logger.middleware"; // Import your middleware here

@Module({
  providers: [CustomLoggerService, LoggerMiddleware],
  exports: [CustomLoggerService], // Export the logger service
})
export class LoggerModule {}
