import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { LinksModule } from './links/links.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    LinksModule,
    PrismaModule,
  ],
})
export class AppModule {}
