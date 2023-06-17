import { generate } from 'randomstring';
import { Column, Entity } from 'typeorm';
import { DomainModel } from 'src/domain/models';
import { IsInt, IsNotEmpty, IsString, IsUrl, Max, Min } from 'class-validator';

@Entity()
export class ShortUrl extends DomainModel {

  @IsNotEmpty()
  @IsString()
  @Min(6)
  @Max(6)
  @Column()
  public shortCode: string = generate(6);

  @IsUrl()
  @IsNotEmpty()
  @Column()
  public realUrl: string;

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @Column()
  public accessCount: number = 0;
  
}
