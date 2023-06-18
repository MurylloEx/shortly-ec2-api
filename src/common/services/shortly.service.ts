import { Injectable } from '@nestjs/common';
import { ShortUrlDto } from 'src/common';
import { ShortlyDomainService } from 'src/domain';

@Injectable()
export class ShortlyService {
  
  constructor(private readonly shortlyDomainService: ShortlyDomainService) {}

  async deleteShortUrl(shortCode: string): Promise<ShortUrlDto> {
    const entity = await this.shortlyDomainService.deleteByCode(shortCode);
    return entity.toDto(ShortUrlDto);
  }

  async viewShortUrl(shortCode: string): Promise<ShortUrlDto> {
    const entity = await this.shortlyDomainService.fetchByCode(shortCode);
    return entity.toDto(ShortUrlDto);
  }

  async changeShortUrl(shortCode: string, newRealUrl: string): Promise<ShortUrlDto> {
    const entity = await this.shortlyDomainService.updateByCode(shortCode, newRealUrl);
    return entity.toDto(ShortUrlDto);
  }

  async createShortUrl(realUrl: string): Promise<ShortUrlDto> {
    const entity = await this.shortlyDomainService.create(realUrl);
    return entity.toDto(ShortUrlDto);
  }

  async incrementAccessCountByCode(shortCode: string): Promise<ShortUrlDto> {
    const entity = await this.shortlyDomainService.incrementAccessCountByCode(shortCode);
    return entity.toDto(ShortUrlDto);
  }

}
