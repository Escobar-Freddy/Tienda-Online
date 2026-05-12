import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  // Configuración de Swagger/Scalar
  const config = new DocumentBuilder()
    .setTitle('Tienda Online API')
    .setDescription('API para gestión de tienda online con clientes, categorías, productos y órdenes')
    .setVersion('1.0')
    .addTag('clientes', 'Endpoints para gestión de clientes')
    .addTag('categorias', 'Endpoints para gestión de categorías')
    .addTag('productos', 'Endpoints para gestión de productos')
    .addTag('ordenes', 'Endpoints para gestión de órdenes')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);  // URL: http://localhost:3000/api/docs
  
  await app.listen(3000);
  console.log('Servidor corriendo en http://localhost:3000');
  console.log(' Documentación Swagger en http://localhost:3000/api/docs');
}
bootstrap();