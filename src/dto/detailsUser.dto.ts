import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateDetailUserDto {
  @IsString()
  @IsNotEmpty()
  detailsName: string;

  @IsString()
  @IsNotEmpty()
  detailsLastname: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  postalCode: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;
}

export class UpdateDetailUserDto {
  @IsString()
  @IsOptional()
  detailsName?: string;

  @IsString()
  @IsOptional()
  detailsLastname?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  postalCode?: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsNumber()
  @IsOptional()
  phone?: number;
}
