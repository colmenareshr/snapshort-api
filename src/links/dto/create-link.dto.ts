import { IsString, IsOptional } from 'class-validator'

export class CreateLinkDto {
  @IsString()
  longLink: string

  @IsString()
  @IsOptional()
  shortCode?: string

  @IsOptional()
  customSlug?: string

  @IsOptional()
  userId?: number
}
