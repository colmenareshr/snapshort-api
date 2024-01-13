import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { LinksModule } from './links/links.module'

@Module({
  imports: [UsersModule, LinksModule],
})
export class AppModule {}
