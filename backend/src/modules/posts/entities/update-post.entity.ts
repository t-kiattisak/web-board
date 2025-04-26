export class UpdatePostEntity {
  title?: string;
  content?: string;
  categoryId?: string;

  constructor(partial: Partial<UpdatePostEntity>) {
    Object.assign(this, partial);
  }
}
