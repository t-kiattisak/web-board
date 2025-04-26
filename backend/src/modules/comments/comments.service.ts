import { Injectable, ForbiddenException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { CreatePostEntity } from '../posts/entities/create-post.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private repo: CommentsRepository) {}

  create(postId: string, userId: string, dto: CreateCommentDto) {
    const entity = new CommentEntity({ ...dto, userId, postId });
    return this.repo.create(entity);
  }

  async update(id: string, userId: string, dto: UpdateCommentDto) {
    const entity = new CreatePostEntity(dto);
    const comment = await this.repo.findByIdWithOwnerCheck(id, userId);
    if (!comment) throw new ForbiddenException('Only owner can update');
    return this.repo.update(id, entity);
  }

  async delete(id: string, userId: string) {
    const comment = await this.repo.findByIdWithOwnerCheck(id, userId);
    if (!comment) throw new ForbiddenException('Only owner can delete');
    return this.repo.delete(id);
  }
}
