import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { LoggerInterceptor } from "./common";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("E-commerce Service Documentation")
    .setDescription("API Documentation for the e-commerce service")
    .setVersion("1.0")
    .addTag("E-commerce Service Tag")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalInterceptors(new LoggerInterceptor());

  await app.listen(3000);
}
bootstrap();
