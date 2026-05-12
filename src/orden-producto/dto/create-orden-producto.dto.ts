import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateOrdenProductoDto {
  @IsNumber()
  @IsNotEmpty()
  idProducto: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  precio_unitario: number;
}