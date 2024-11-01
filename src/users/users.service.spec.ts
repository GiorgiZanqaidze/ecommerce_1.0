import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "@prisma/client";

// Helper function to mock Prisma Client methods
const mockPrismaService = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("UsersService", () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a user", async () => {
      const createUserDto: CreateUserDto = {
        firstName: "John",
        lastName: "Doe",
        isActive: true,
        password: "password123",
        email: "john.doe@example.com",
        roles: "user",
      };

      const createdUser: User = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        isActive: true,
        password: "password123",
        email: "john.doe@example.com",
        roles: "user",
      };

      (prismaService.user.create as jest.Mock).mockResolvedValue(createdUser);
      expect(await service.create(createUserDto)).toEqual(createdUser);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: createUserDto,
      });
    });
  });

  describe("findAll", () => {
    it("should return an array of users", async () => {
      const result: User[] = [];
      (prismaService.user.findMany as jest.Mock).mockResolvedValue(result);
      expect(await service.findAll()).toEqual(result);
    });
  });

  describe("findOne", () => {
    it("should return a single user", async () => {
      const user: User = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        isActive: true,
        password: "password123",
        email: "john.doe@example.com",
        roles: "user",
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);
      expect(await service.findOne(1)).toEqual(user);
    });
  });

  describe("update", () => {
    it("should update a user", async () => {
      const updateUserDto: UpdateUserDto = { firstName: "John Updated" };
      const user: User = {
        id: 1,
        firstName: "John Updated",
        lastName: "Doe",
        isActive: true,
        password: "password123",
        email: "john.doe@example.com",
        roles: "user",
      };
      (prismaService.user.update as jest.Mock).mockResolvedValue(user);
      expect(await service.update(1, updateUserDto)).toEqual(user);
    });
  });

  describe("remove", () => {
    it("should remove a user", async () => {
      (prismaService.user.delete as jest.Mock).mockResolvedValue({});
      expect(await service.remove(1)).toEqual(undefined);
    });
  });
});
