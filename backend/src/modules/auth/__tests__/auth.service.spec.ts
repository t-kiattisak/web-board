import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser: User = {
    id: 'user-id',
    username: 'username',
    createdAt: new Date(),
  };

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return existing user if found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser);

    const result = await service.loginOrRegister('username');
    expect(result).toEqual(mockUser);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { username: 'username' },
    });
    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });

  it('should create user if not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(mockUser);

    const result = await service.loginOrRegister('username');
    expect(result).toEqual(mockUser);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: { username: 'username' },
    });
  });
});
