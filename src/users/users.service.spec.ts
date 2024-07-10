import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
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
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = { firstName: 'John', lastName: 'Doe', isActive: true };
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
    const createUserDto = { firstName: 'John', lastName: 'Doe', isActive: true };
    const user = await service.create(createUserDto);
    const foundUser = await service.findOne(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toEqual(user.id);
  });

  it('should update a user', async () => {
    const createUserDto = { firstName: 'John', lastName: 'Doe', isActive: true };
    const user = await service.create(createUserDto);
    const updateUserDto = { firstName: 'Jane', lastName: 'Doe', isActive: false };
    const updatedUser = await service.update(user.id, updateUserDto);
    expect(updatedUser.firstName).toEqual('Jane');
    expect(updatedUser.lastName).toEqual('Doe');
    expect(updatedUser.isActive).toEqual(false);
  });

  it('should remove a user', async () => {
    const createUserDto = { firstName: 'John', lastName: 'Doe', isActive: true };
    const user = await service.create(createUserDto);
    await service.remove(user.id);
    const foundUser = await service.findOne(user.id);
    expect(foundUser).toBeNull();
  });
});
