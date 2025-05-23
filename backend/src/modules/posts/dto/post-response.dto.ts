import { Expose, Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';

class UserResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  username: string;

  @Expose()
  @IsString()
  avatarUrl: string;

  @Expose()
  @IsDate()
  createdAt: Date;
}

class CategoryResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  name: string;
}

class CommentResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsUUID()
  postId: string;

  @Expose()
  @IsUUID()
  userId: string;

  @Expose()
  @IsDate()
  createdAt: Date;
}

export class PostResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsUUID()
  userId: string;

  @Expose()
  @IsUUID()
  categoryId: string;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @Type(() => UserResponseDto)
  @ValidateNested()
  user: UserResponseDto;

  @Expose()
  @Type(() => CategoryResponseDto)
  @ValidateNested()
  category: CategoryResponseDto;

  @Expose()
  @Type(() => CommentResponseDto)
  @ValidateNested({ each: true })
  @IsArray()
  comments: CommentResponseDto[];
}
