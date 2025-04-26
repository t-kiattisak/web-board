import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

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

  create(data: {
    title: string;
    content: string;
    userId: string;
    categoryId?: string;
  }) {
    return this.prisma.post.create({ data });
  }

  update(
    id: string,
    data: { title?: string; content?: string; categoryId?: string },
  ) {
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
