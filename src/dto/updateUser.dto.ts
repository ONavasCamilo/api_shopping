import {
  IsEmail,
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  lastname?: string;

  @IsEmpty()
  password?: string;

  @IsEmpty()
  isActive?: boolean;
}

export default UpdateUserDto;
