import { IsDate, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";

export class ShortUrlDto {

  @IsString()
  @IsNotEmpty()
  public shortId: string;

  @IsString()
  @IsNotEmpty()
  public shortCode: string

  @IsUrl()
  @IsString()
  @IsNotEmpty()
  public realUrl: string;

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  public accessCount: string;
  
  @IsDate()
  @IsDefined()
  public createdAt: Date;

  @IsDate()
  @IsOptional()
  public updatedAt: Date;

  @IsDate()
  @IsOptional()
  public deletedAt: Date;

}
