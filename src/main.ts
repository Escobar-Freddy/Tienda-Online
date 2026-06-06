import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para producción (importante para Render)
  app.enableCors();
  
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
  
  // Cambiar a 'api' 
  SwaggerModule.setup('api', app, document);  // URL: http://localhost:3000/api
  
  // Usar puerto dinámico y escuchar en 0.0.0.0
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📚 Documentación Swagger en http://localhost:${port}/api`);
}
bootstrap();