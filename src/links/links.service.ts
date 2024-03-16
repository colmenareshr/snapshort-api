import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { CreateLinkDto, EditLinkDto } from './dto'
import { PrismaService } from '../prisma/prisma.service'
import { generateShortCode } from 'src/utils'

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  getLinks(userId: number) {
    return this.prisma.link.findMany({ where: { userId } })
  }

  getLink(userId: number, linkId: number) {
    return this.prisma.link.findFirst({
      where: { id: linkId, userId },
    })
  }

  async createLink(userId: number, dto: CreateLinkDto) {
    try {
      const { longLink, customSlug } = dto
      const existingLink = await this.prisma.link.findFirst({
        where: { shortCode: customSlug },
      })

      if (existingLink) {
        throw new ConflictException(
          'El enlace personalizado ya está en uso. Por favor, elige otro.',
        )
      }

      const generatedShortLink = customSlug || generateShortCode()
      const link = await this.prisma.link.create({
        data: {
          userId,
          longLink,
          shortCode: generatedShortLink,
        },
      })

      return link
    } catch (error) {
      // Captura cualquier otro error y devuelve un 409 para conflictos específicos
      if (error instanceof ConflictException) {
        throw error
      } else {
        // Cualquier otro error se manejará como un error interno del servidor
        console.error(error)
        throw new InternalServerErrorException(
          'Error al crear el enlace. Por favor, inténtalo de nuevo.',
        )
      }
    }
  }

  async editLink(userId: number | undefined, linkId: number, dto: EditLinkDto) {
    const link = await this.prisma.link.update({
      where: { id: linkId, userId },
      data: {
        ...dto,
      },
    })

    if (!link) {
      throw new NotFoundException('Link not found')
    }

    return link
  }

  async deleteLink(userId: number, linkId: number) {
    await this.prisma.link.delete({
      where: {
        id: linkId,
        userId,
      },
    })
  }
}
