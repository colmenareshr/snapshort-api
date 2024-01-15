import { IsEmail, IsOptional, IsString } from 'class-validator'

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  firtName?: string

  @IsString()
  @IsOptional()
  lastName?: string
}
