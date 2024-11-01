import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
  log(message: string) {
    console.log(message); // You can enhance this to log to a file or external service
  }

  error(message: string, trace?: string) {
    console.error(message, trace);
  }

  warn(message: string) {
    console.warn(message);
  }

  // Additional logging methods as needed
}
