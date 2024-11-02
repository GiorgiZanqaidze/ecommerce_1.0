import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CustomLoggerService } from "./custom-logger.service";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new CustomLoggerService(LoggerInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { method, url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        this.logger.log(`[${method}] ${url} - ${response.statusCode} (${responseTime}ms)`);
      }),
    );
  }
}
