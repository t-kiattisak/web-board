import { Injectable, ForbiddenException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { CreatePostEntity } from './entities/create-post.entity';
import { UpdatePostEntity } from './entities/update-post.entity';

@Injectable()
export class PostsService {
  constructor(private repo: PostsRepository) {}

  getAll() {
    return this.repo.findAll();
  }

  getById(id: string) {
    return this.repo.findById(id);
  }

  getPostsByUserId(userId: string) {
    return this.repo.findAllByUserId(userId);
  }

  createPost(userId: string, dto: CreatePostDto) {
    const entity = new CreatePostEntity({ userId, ...dto });
    return this.repo.create(entity);
  }

  async updatePost(id: string, userId: string, dto: UpdatePostDto) {
    const entity = new UpdatePostEntity(dto);
    const post = await this.repo.findByIdWithOwnerCheck(id, userId);
    if (!post) throw new ForbiddenException('You can only edit your own post');
    return this.repo.update(id, entity);
  }

  async deletePost(id: string, userId: string) {
    const post = await this.repo.findByIdWithOwnerCheck(id, userId);
    if (!post)
      throw new ForbiddenException('You can only delete your own post');
    return this.repo.delete(id);
  }
}
