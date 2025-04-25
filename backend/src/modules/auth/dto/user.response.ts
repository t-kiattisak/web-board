import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  userId: string;

  @Expose()
  username: string;
}
