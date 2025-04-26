import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/currentUser.decorator';
import { User } from '../auth/jwt.strategy';

@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  // by user
  @UseGuards(JwtAuthGuard)
  @Get('user/me')
  async getMyPosts(@CurrentUser() user: User) {
    const posts = await this.service.getPostsByUserId(user.userId);
    return {
      data: posts,
      message: 'Posts fetched successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: User, @Body() dto: CreatePostDto) {
    const created = await this.service.createPost(user.userId, dto);
    return {
      data: created,
      message: 'Post has been successfully created',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: UpdatePostDto,
  ) {
    const updated = await this.service.updatePost(id, user.userId, dto);
    return {
      data: updated,
      message: 'Post has been successfully updated',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: User) {
    const deleted = await this.service.deletePost(id, user.userId);
    return {
      data: deleted,
      message: 'Post has been successfully deleted',
    };
  }
}
