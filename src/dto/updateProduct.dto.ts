import {
  IsDecimal,
  IsEmpty,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @Min(0, { message: "El precio no puede ser negativo." })
  @Max(9999999999.99, { message: "El precio no puede exceder 9999999999.99." })
  price?: number;

  @IsOptional()
  @IsInt({ message: "Stock debe ser un número entero" })
  @Min(0)
  stock?: number;

  @IsEmpty()
  imgUrl?: string;
}

export default UpdateProductDto;
