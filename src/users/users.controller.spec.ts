import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = { firstName: 'John', lastName: 'Doe', isActive: true };
    const user = await controller.create(createUserDto);
    expect(user).toHaveProperty('id');
    expect(user.firstName).toEqual('John');
    expect(user.lastName).toEqual('Doe');
    expect(user.isActive).toEqual(true);
  });

  it('should find all users', async () => {
    const users = await controller.findAll();
    expect(users).toBeInstanceOf(Array);
  });

  it('should find one user', async () => {
    const createUserDto = { firstName: 'John', lastName: 'Doe', isActive: true };
    const createdUser = await controller.create(createUserDto);
    const user = await controller.findOne(createdUser.id.toString());
    expect(user).toBeDefined();
    expect(user.id).toEqual(createdUser.id);
  });

  it('should update a user', async () => {
    const createUserDto = { firstName: 'John', lastName: 'Doe', isActive: true };
    const createdUser = await controller.create(createUserDto);
    const updateUserDto = { firstName: 'Jane', lastName: 'Doe', isActive: false };
    const updatedUser = await controller.update(createdUser.id.toString(), updateUserDto);
    expect(updatedUser.firstName).toEqual('Jane');
    expect(updatedUser.lastName).toEqual('Doe');
    expect(updatedUser.isActive).toEqual(false);
  });

  it('should remove a user', async () => {
    const createUserDto = { firstName: 'John', lastName: 'Doe', isActive: true };
    const createdUser = await controller.create(createUserDto);
    await controller.remove(createdUser.id.toString());
    const user = await service.findOne(createdUser.id);
    expect(user).toBeNull();
  });
});
