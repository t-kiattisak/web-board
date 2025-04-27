/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostsRepository } from '../posts.repository';
import { PostsService } from '../posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let repo: PostsRepository;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findAllByUserId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByIdWithOwnerCheck: jest.fn(),
    } as any;

    service = new PostsService(repo);
  });

  describe('getAll', () => {
    it('should return all posts', async () => {
      (repo.findAll as jest.Mock).mockResolvedValueOnce(['post1', 'post2']);
      const posts = await service.getAll();
      expect(posts).toEqual(['post1', 'post2']);
      expect(repo.findAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return post by id', async () => {
      (repo.findById as jest.Mock).mockResolvedValueOnce('post1');
      const post = await service.getById('some-id');
      expect(post).toEqual('post1');
      expect(repo.findById).toHaveBeenCalledWith('some-id');
    });
  });

  describe('getPostsByUserId', () => {
    it('should return posts by user id', async () => {
      (repo.findAllByUserId as jest.Mock).mockResolvedValueOnce(['post1']);
      const posts = await service.getPostsByUserId('user-id');
      expect(posts).toEqual(['post1']);
      expect(repo.findAllByUserId).toHaveBeenCalledWith('user-id');
    });
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      const dto: CreatePostDto = {
        title: 'title',
        content: 'content',
        categoryId: 'cate-id',
      };
      (repo.create as jest.Mock).mockResolvedValueOnce('created-post');

      const post = await service.createPost('user-id', dto);

      expect(post).toEqual('created-post');
      expect(repo.create).toHaveBeenCalled();
    });
  });

  describe('updatePost', () => {
    it('should update a post if user is owner', async () => {
      (repo.findByIdWithOwnerCheck as jest.Mock).mockResolvedValueOnce({
        id: 'post-id',
      });
      (repo.update as jest.Mock).mockResolvedValueOnce('updated-post');

      const dto: UpdatePostDto = {
        title: 'new title',
        content: 'new content',
        categoryId: 'new-cate-id',
      };
      const post = await service.updatePost('post-id', 'user-id', dto);

      expect(post).toEqual('updated-post');
      expect(repo.findByIdWithOwnerCheck).toHaveBeenCalledWith(
        'post-id',
        'user-id',
      );
      expect(repo.update).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if user is not owner', async () => {
      (repo.findByIdWithOwnerCheck as jest.Mock).mockResolvedValueOnce(null);

      const dto: UpdatePostDto = {
        title: 'new title',
        content: 'new content',
        categoryId: 'new-cate-id',
      };

      await expect(
        service.updatePost('post-id', 'wrong-user', dto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('deletePost', () => {
    it('should delete a post if user is owner', async () => {
      (repo.findByIdWithOwnerCheck as jest.Mock).mockResolvedValueOnce({
        id: 'post-id',
      });
      (repo.delete as jest.Mock).mockResolvedValueOnce('deleted-post');

      const result = await service.deletePost('post-id', 'user-id');

      expect(result).toEqual('deleted-post');
      expect(repo.findByIdWithOwnerCheck).toHaveBeenCalledWith(
        'post-id',
        'user-id',
      );
      expect(repo.delete).toHaveBeenCalledWith('post-id');
    });

    it('should throw ForbiddenException if user is not owner', async () => {
      (repo.findByIdWithOwnerCheck as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.deletePost('post-id', 'wrong-user')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
