import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
  AuthModule,
  UsersModule,
  ProductsModule,
  PrismaModule,
  ConfigModule.forRoot({
    isGlobal: true, // Makes the module global
    envFilePath: '.env', // Specify the path to the .env file
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
