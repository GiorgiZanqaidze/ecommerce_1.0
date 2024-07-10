import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let module: TestingModule;

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
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      email: 'john.doe@example.com',
      password: 'password123',
      roles: 'user',
    };
    const user = await service.create(createUserDto);
    expect(user).toHaveProperty('id');
    expect(user.firstName).toEqual('John');
    expect(user.lastName).toEqual('Doe');
    expect(user.isActive).toEqual(true);
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(users).toBeInstanceOf(Array);
  });

  it('should find a user by id', async () => {
    const createUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      email: 'john.doe@example.com',
      password: 'password123',
      roles: 'user',
    };
    const createdUser = await service.create(createUserDto);
    const foundUser = await service.findOne(createdUser.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toEqual(createdUser.id);
  });

  it('should update a user', async () => {
    const createUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      email: 'john.doe@example.com',
      password: 'password123',
      roles: 'user',
    };
    const createdUser = await service.create(createUserDto);
    const updateUserDto = { firstName: 'Jane', lastName: 'Doe', isActive: false };
    const updatedUser = await service.update(createdUser.id, updateUserDto);
    expect(updatedUser.firstName).toEqual('Jane');
    expect(updatedUser.lastName).toEqual('Doe');
    expect(updatedUser.isActive).toEqual(false);
  });

  it('should remove a user', async () => {
    const createUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      email: 'john.doe@example.com',
      password: 'password123',
      roles: 'user',
    };
    const createdUser = await service.create(createUserDto);
    await service.remove(createdUser.id);
    const foundUser = await service.findOne(createdUser.id);
    expect(foundUser).toBeNull();
  });
});
