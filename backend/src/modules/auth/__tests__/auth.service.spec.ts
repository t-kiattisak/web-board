import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthRepository } from '../auth.repository';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let repo: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: {
            findUserByUsername: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get<AuthRepository>(AuthRepository);
  });

  it('should return existing user if found', async () => {
    const user = { id: '123', username: 'testuser' }; // 👉 Mock user ขึ้นมา
    (repo.findUserByUsername as jest.Mock).mockResolvedValue(user); // 👉 Mock function ให้คืน user

    const result = await service.loginOrRegister('testuser');
    expect(result.user).toEqual(user);
    expect(result.token).toBe('mocked-jwt-token');
  });

  it('should create user if not found', async () => {
    const newUser = { id: '456', username: 'newuser' };
    (repo.findUserByUsername as jest.Mock).mockResolvedValue(null);
    (repo.createUser as jest.Mock).mockResolvedValue(newUser);

    const result = await service.loginOrRegister('newuser');
    expect(result.user).toEqual(newUser);
    expect(result.token).toBe('mocked-jwt-token');
  });
});
