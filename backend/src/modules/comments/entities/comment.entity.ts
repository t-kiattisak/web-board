export class CommentEntity {
  id: string;
  content: string;
  postId: string;
  userId: string;
  createdAt: Date;

  constructor(partial: Partial<CommentEntity>) {
    Object.assign(this, partial);
  }
}
