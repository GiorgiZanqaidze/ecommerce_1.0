import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, {
        provide: UsersService,
        useValue: {
          findAll: jest.fn().mockResolvedValue(['user1', 'user2']),
        },
      },],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      const users = await appController.getAllUsers();
      expect(users).toEqual(['user1', 'user2']);
    });
  });
});
