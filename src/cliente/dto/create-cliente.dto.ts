import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Juan Carlos', description: 'Nombres del cliente' })
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido paterno' })
  @IsString()
  @IsNotEmpty()
  paterno: string;

  @ApiProperty({ example: 'González', description: 'Apellido materno' })
  @IsString()
  @IsNotEmpty()
  materno: string;

  @ApiProperty({ example: 'juan@email.com', description: 'Email único del cliente' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}