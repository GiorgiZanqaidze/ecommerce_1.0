import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    const DATABASE_HOST = configService.get<string>("DATABASE_HOST");
    const DATABASE_PORT = configService.get<string>("DATABASE_PORT");
    const DATABASE_USERNAME = configService.get<string>("DATABASE_USERNAME");
    const DATABASE_PASSWORD = configService.get<string>("DATABASE_PASSWORD");
    const DATABASE_NAME = configService.get<string>("DATABASE_NAME");

    const DATABASE_URL = `mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

    super({
      datasources: {
        db: {
          url: DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
