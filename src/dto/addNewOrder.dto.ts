import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";

export class ProductType {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class addNewOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductType)
  products: ProductType[];
}
