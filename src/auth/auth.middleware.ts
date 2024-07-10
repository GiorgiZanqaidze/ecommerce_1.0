import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      try {
        const decoded: any = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded.user as User; // Cast to User type if necessary
      } catch (error) {
        // Token verification failed
        console.error('Token verification failed:', error);
      }
    }

    next();
  }
}
