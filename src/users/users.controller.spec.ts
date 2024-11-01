import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(dto => Promise.resolve({ id: Date.now(), ...dto })),
    findAll: jest.fn(() => Promise.resolve([{ id: 1, firstName: "John", email: "john@example.com" }])),
    findOne: jest.fn(id => Promise.resolve({ id, firstName: "John", email: "john@example.com" })),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn(id => Promise.resolve({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe("create", () => {
    it("should create a user", async () => {
      const createUserDto: CreateUserDto = {
        firstName: "John",
        password: "securePassword",
        email: "john@example.com",
        roles: "user",
      };
      const result = await controller.create(createUserDto);
      expect(result).toEqual({ id: expect.any(Number), ...createUserDto });
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe("findAll", () => {
    it("should return an array of users", async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{ id: 1, firstName: "John", email: "john@example.com" }]);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a single user", async () => {
      const result = await controller.findOne("1");
      expect(result).toEqual({ id: 1, firstName: "John", email: "john@example.com" });
      expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update and return the user", async () => {
      const updateUserDto: UpdateUserDto = { firstName: "John Smith" };
      const result = await controller.update("1", updateUserDto);
      expect(result).toEqual({ id: 1, ...updateUserDto });
      expect(mockUsersService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe("remove", () => {
    it("should remove the user and return the id", async () => {
      const result = await controller.remove("1");
      expect(result).toEqual({ id: 1 });
      expect(mockUsersService.remove).toHaveBeenCalledWith(1);
    });
  });
});
