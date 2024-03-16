import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class EditLinkDto {
  @IsString()
  @IsNotEmpty()
  longLink: string

  @IsString()
  @IsOptional()
  shortCode?: string
}
