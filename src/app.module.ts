import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { LinksModule } from './links/links.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [AuthModule, UsersModule, LinksModule],
})
export class AppModule {}
