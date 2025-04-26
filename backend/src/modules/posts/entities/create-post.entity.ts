export class CreatePostEntity {
  title: string;
  content: string;
  userId: string;

  constructor(partial: Partial<CreatePostEntity>) {
    Object.assign(this, partial);
  }
}
