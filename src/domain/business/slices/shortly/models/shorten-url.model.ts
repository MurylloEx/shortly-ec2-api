import { Column, Entity } from 'typeorm';
import { DomainModel } from 'src/domain/models';

@Entity()
export class ShortenUrl extends DomainModel {

  @Column()
  public shortCode: string;

  @Column()
  public realUrl: string;
  
}
