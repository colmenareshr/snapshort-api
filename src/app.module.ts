import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { LinksModule } from './links/links.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, LinksModule, PrismaModule],
})
export class AppModule {}
