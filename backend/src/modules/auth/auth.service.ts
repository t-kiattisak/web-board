import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async loginOrRegister(username: string) {
    let user = await this.authRepo.findUserByUsername(username);
    if (!user) {
      user = await this.authRepo.createUser(username);
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
