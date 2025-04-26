import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CommentEntity) {
    return this.prisma.comment.create({ data });
  }

  update(id: string, data: Partial<Pick<CommentEntity, 'content'>>) {
    return this.prisma.comment.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.comment.delete({ where: { id } });
  }

  findByIdWithOwnerCheck(id: string, userId: string) {
    return this.prisma.comment.findFirst({
      where: { id, userId },
    });
  }
}
