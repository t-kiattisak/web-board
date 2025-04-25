import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async loginOrRegister(username: string) {
    let user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      user = await this.prisma.user.create({ data: { username } });
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
