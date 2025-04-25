import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async loginOrRegister(username: string): Promise<User> {
    const existing = await this.prisma.user.findUnique({ where: { username } });
    if (existing) return existing;

    return this.prisma.user.create({ data: { username } });
  }
}
