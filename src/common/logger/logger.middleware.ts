import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from '../logger/custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;

    // Log the incoming request
    this.logger.log(`[${method}] ${originalUrl}`);

    res.on('finish', () => {
      // Log the response details once the response is finished
      this.logger.log(`[${method}] ${originalUrl} - ${res.statusCode}`);
    });

    next();
  }
}
