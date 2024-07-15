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

  describe('root', () => {});
});
