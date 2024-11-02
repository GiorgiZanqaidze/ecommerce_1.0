import { Injectable, Logger } from "@nestjs/common";
import { LoggerContext } from "../types/logger-context.enum";

@Injectable()
export class CustomLoggerService extends Logger {
  private static colors = {
    [LoggerContext.DEFAULT]: { log: "\x1b[37m", error: "\x1b[31m", success: "\x1b[32m", warn: "\x1b[33m" }, // White, Red, Green, Yellow
    [LoggerContext.RABBIT]: { log: "\x1b[38;5;209m", error: "\x1b[41m", success: "\x1b[33m", warn: "\x1b[35m" }, // Cyan, Red background, Yellow, Magenta
  };

  log(message: string, context?: LoggerContext) {
    const color = (context && CustomLoggerService.colors[context]?.log) || CustomLoggerService.colors[LoggerContext.DEFAULT].log;
    super.log(`${color}[${context || LoggerContext.DEFAULT}] ${message}\x1b[0m`); // Reset color after message
  }

  error(message: string, trace?: string, context?: LoggerContext) {
    const color = (context && CustomLoggerService.colors[context]?.error) || CustomLoggerService.colors[LoggerContext.DEFAULT].error;
    super.error(`${color}[${context || LoggerContext.DEFAULT}] ${message}\x1b[0m`, trace); // Reset color after message
  }

  success(message: string, context?: LoggerContext) {
    const color = (context && CustomLoggerService.colors[context]?.success) || CustomLoggerService.colors[LoggerContext.DEFAULT].success;
    super.log(`${color}[${context || LoggerContext.DEFAULT}] ${message}\x1b[0m`); // Reset color after message
  }

  warn(message: string, context?: LoggerContext) {
    const color = (context && CustomLoggerService.colors[context]?.warn) || CustomLoggerService.colors[LoggerContext.DEFAULT].warn;
    super.warn(`${color}[${context || LoggerContext.DEFAULT}] ${message}\x1b[0m`); // Reset color after message
  }
}
