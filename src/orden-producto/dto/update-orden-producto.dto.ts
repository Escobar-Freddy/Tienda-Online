import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenProductoDto } from './create-orden-producto.dto';

export class UpdateOrdenProductoDto extends PartialType(CreateOrdenProductoDto) {}
