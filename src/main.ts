import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadExtensionsDynamically } from './extensions.snanner';
import { extensionsList } from './extensions.list';

async function bootstrap() {
  const extensions = await loadExtensionsDynamically();

  const app = await NestFactory.create(AppModule.register(extensionsList.concat(extensions)));

  const port = process.env.PORT ?? 3000;
  const prefix = process.env.PREFIX ?? "api";

  app.setGlobalPrefix(prefix);

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Listening on http://localhost:${port}/${prefix}`);
    console.log(`Listening on ${process.env.SERVER_IP}:${port}/${prefix}`);
  });

}

bootstrap();
