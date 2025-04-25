import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResponseModel } from '@/common/decorators/response-model.decorator';
import { UserResponse } from './dto/user.response';
import { CurrentUser } from '@/common/decorators/currentUser.decorator';
import { User } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.loginOrRegister(dto.username);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ResponseModel(UserResponse)
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
