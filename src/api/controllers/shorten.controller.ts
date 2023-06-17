import { Controller, Post, Query } from '@nestjs/common';
import { ShortlyService, ShortUrlDto } from 'src/common';

@Controller('/shorten')
export class ShortenController {

  constructor(private readonly shortlyService: ShortlyService) {}

  @Post('/')
  async createShortUrl(@Query('url') url: string): Promise<ShortUrlDto> {
    return await this.shortlyService.createShortUrl(url);
  }

}
