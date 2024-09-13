import { IsOptional, IsPositive, Min } from "class-validator";

export class FiltersUsersDto {
  @IsOptional()
  @IsPositive()
  limit: number | undefined;

  @IsOptional()
  @Min(0)
  offset: number | undefined;

  @IsOptional()
  name: string | undefined;

  @IsOptional()
  email: string | undefined;
}
