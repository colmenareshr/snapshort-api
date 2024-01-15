import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common'
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator/'
import { JwtGuard } from '../auth/guard'
import { EditUserDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user
  }
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto)
  }
}
