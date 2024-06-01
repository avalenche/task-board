import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true, // Allow cookies to be included in requests
  });
  await app.listen(3000);
}
bootstrap();
