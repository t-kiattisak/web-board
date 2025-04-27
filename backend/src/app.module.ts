import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { CategoryModule } from './modules/category/category.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    PostsModule,
    CommentsModule,
    PrismaModule,
    AuthModule,
    CategoryModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
})
export class AppModule {}
