import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    //generate hash password
    const hash = await argon.hash(dto.password)
    //save a new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      })
      delete user.hash
      //return the saved user
      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credencials taken')
        }
      }
      throw error
    }
  }

  async signin(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })
    //if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credencial incorrect')

    //compare password
    const valid = await argon.verify(user.hash, dto.password)
    //if password incorrecto throw exception
    if (!valid) throw new ForbiddenException('Password incorrect')
    delete user.hash

    return user
  }
}
