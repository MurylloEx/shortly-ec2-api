import { IsString, IsUrl } from "class-validator";

export class CreateShortenUrlDto {

  @IsString()
  @IsUrl()
  public realUrl: string;

}
