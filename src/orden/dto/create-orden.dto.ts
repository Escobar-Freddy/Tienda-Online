import { IsNumber, IsArray, ValidateNested, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ProductoEnOrdenDto {
  @IsNumber()
  @IsNotEmpty()
  idProducto: number;
  
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  cantidad: number;
}

export class CreateOrdenDto {
  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoEnOrdenDto)
  productos: ProductoEnOrdenDto[];
}