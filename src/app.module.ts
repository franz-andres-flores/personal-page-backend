import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseMysqlProviderModule } from './common/db/mysql/mysql.provider';
import { AuthorizationJWTProvider } from './common/authorization/jwt/jwt.provider';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { StudiesModule } from './studies/studies.module';
import { CoursesModule } from './courses/courses.module';
import { CategoriesModule } from './categories/categories.module';
import { ProjectsModule } from './projects/projects.module';
import { SectionModule } from './section/section.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseMysqlProviderModule,
    AuthorizationJWTProvider,
    
    AuthModule,
    UserModule,
    JobsModule,
    StudiesModule,
    CoursesModule,
    CategoriesModule,
    ProjectsModule,
    SectionModule,
    PublicationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
