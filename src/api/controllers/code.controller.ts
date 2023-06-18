import { Response } from 'express';
import { ShortlyService, ShortUrlDto } from 'src/common';
import { Controller, Delete, Get, Param, Put, Query, Res } from '@nestjs/common';

@Controller('/code')
export class CodeController {

  constructor(private readonly shortlyService: ShortlyService) {}

  @Get('/:code')
  async redirectToShortUrl(@Param('code') code: string, @Res() response: Response): Promise<void> {
    const dto = await this.shortlyService.incrementAccessCountByCode(code);
    return response.redirect(301, dto.realUrl);
  }

  @Delete('/:code')
  async deleteShortUrl(@Param('code') code: string): Promise<ShortUrlDto> {
    return await this.shortlyService.deleteShortUrl(code);
  }

  @Get('/:code/info')
  async viewShortUrl(@Param('code') code: string): Promise<ShortUrlDto> {
    return await this.shortlyService.viewShortUrl(code);
  }

  @Put('/:code/shorten')
  async changeShortUrl(@Param('code') code: string, @Query('url') url: string): Promise<ShortUrlDto> {
    return await this.shortlyService.changeShortUrl(code, url);
  }

}
