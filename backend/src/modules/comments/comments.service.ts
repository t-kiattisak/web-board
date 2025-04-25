import { Injectable, ForbiddenException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private repo: CommentsRepository) {}

  create(postId: string, userId: string, dto: { content: string }) {
    return this.repo.create({ ...dto, userId, postId });
  }

  async update(id: string, userId: string, dto: { content?: string }) {
    const comment = await this.repo.findByIdWithOwnerCheck(id, userId);
    if (!comment) throw new ForbiddenException('Only owner can update');
    return this.repo.update(id, dto);
  }

  async delete(id: string, userId: string) {
    const comment = await this.repo.findByIdWithOwnerCheck(id, userId);
    if (!comment) throw new ForbiddenException('Only owner can delete');
    return this.repo.delete(id);
  }
}
