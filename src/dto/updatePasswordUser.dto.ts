import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

class updatePasswordUserDto {
  @IsNotEmpty()
  oldpassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
  password: string;

  @IsNotEmpty()
  confirmpassword: string;

  @IsEmpty()
  name?: string;

  @IsEmpty()
  email?: string;

  @IsEmpty()
  lastname?: string;

  @IsEmpty()
  isActive?: boolean;
}

export default updatePasswordUserDto;
