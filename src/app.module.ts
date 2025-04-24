import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { DatabaseMysqlProviderModule } from './common/db/mysql/mysql.provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseMysqlProviderModule,
    
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
