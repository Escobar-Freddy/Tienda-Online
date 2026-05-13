import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Freddy Elias', description: 'Nombres del cliente' })
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @ApiProperty({ example: 'Escobar', description: 'Apellido paterno' })
  @IsString()
  @IsNotEmpty()
  paterno: string;

  @ApiProperty({ example: 'Catunta', description: 'Apellido materno' })
  @IsString()
  @IsNotEmpty()
  materno: string;

  @ApiProperty({ example: 'fescobarc@email.com', description: 'Email único del cliente' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}