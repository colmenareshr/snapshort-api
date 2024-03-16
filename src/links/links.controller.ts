import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/guard'
import { LinksService } from './links.service'
import { GetUser } from 'src/auth/decorator'
import { CreateLinkDto, EditLinkDto } from './dto'

@UseGuards(JwtGuard)
@Controller('links')
export class LinksController {
  constructor(private linkService: LinksService) {}
  @Get()
  getLinks(@GetUser('id') userId: number) {
    return this.linkService.getLinks(userId)
  }

  @Get(':id')
  getLinkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) linkId: number,
  ) {
    return this.linkService.getLink(userId, linkId)
  }

  @Post()
  createLink(@GetUser('id') userId: number, @Body() dto: CreateLinkDto) {
    const link = this.linkService.createLink(userId, dto)
    return link
  }

  @Patch(':id')
  editLinkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) linkId: number,
    @Body() dto: EditLinkDto,
  ) {
    return this.linkService.editLink(userId, linkId, dto)
  }

  @Delete(':id')
  deleteLinkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) linkId: number,
  ) {
    return this.linkService.deleteLink(userId, linkId)
  }
}
