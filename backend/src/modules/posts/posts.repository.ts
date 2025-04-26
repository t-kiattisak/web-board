import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { CreatePostEntity } from './entities/create-post.entity';
import { UpdatePostEntity } from './entities/update-post.entity';

@Injectable()
export class PostsRepository {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.post.findMany({
      include: {
        user: true,
        category: { select: { id: true, name: true } },
        comments: { orderBy: { createdAt: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        category: { select: { id: true, name: true } },
        comments: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.prisma.post.findMany({
      where: { userId },
      include: {
        user: true,
        category: { select: { id: true, name: true } },
        comments: { orderBy: { createdAt: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: CreatePostEntity) {
    console.log('data', data);
    return this.prisma.post.create({ data });
  }

  update(id: string, data: UpdatePostEntity) {
    return this.prisma.post.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }

  findByIdWithOwnerCheck(id: string, userId: string) {
    return this.prisma.post.findFirst({
      where: { id, userId },
    });
  }
}
