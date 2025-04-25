import { Injectable, ForbiddenException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private repo: PostsRepository) {}

  getAll() {
    return this.repo.findAll();
  }

  getById(id: string) {
    return this.repo.findById(id);
  }

  createPost(userId: string, dto: { title: string; content: string }) {
    return this.repo.create({ ...dto, userId });
  }

  async updatePost(
    id: string,
    userId: string,
    dto: { title?: string; content?: string },
  ) {
    const post = await this.repo.findByIdWithOwnerCheck(id, userId);
    if (!post) throw new ForbiddenException('You can only edit your own post');
    return this.repo.update(id, dto);
  }

  async deletePost(id: string, userId: string) {
    const post = await this.repo.findByIdWithOwnerCheck(id, userId);
    if (!post)
      throw new ForbiddenException('You can only delete your own post');
    return this.repo.delete(id);
  }
}
