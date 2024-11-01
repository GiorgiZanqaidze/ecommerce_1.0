import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service"; // Adjust path if necessary
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

// Mock the entire bcrypt module
jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

describe("AuthService", () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe("signIn", () => {
    it("should return an access token if user is found and password is valid", async () => {
      const user = { id: 1, firstName: "John", password: "hashed-password" };
      const signInDto = { id: 1, pass: "password" };

      // Mock bcrypt.compare to simulate successful password match
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      // Mock UsersService and JwtService
      mockUsersService.findOne.mockResolvedValue(user);
      mockJwtService.signAsync.mockResolvedValue("test-token");

      const result = await authService.signIn(signInDto.id, signInDto.pass);
      expect(result).toEqual({ access_token: "test-token" });
      expect(usersService.findOne).toHaveBeenCalledWith(signInDto.id);
      expect(bcrypt.compare).toHaveBeenCalledWith(signInDto.pass, user.password);
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: user.id, firstName: user.firstName });
    });

    it("should throw UnauthorizedException if user is not found", async () => {
      const signInDto = { id: 1, pass: "password" };

      // Mock UsersService to return null
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(authService.signIn(signInDto.id, signInDto.pass)).rejects.toThrow(new UnauthorizedException("User not found"));
    });

    it("should throw UnauthorizedException if password is invalid", async () => {
      const user = { id: 1, firstName: "John", password: "hashed-password" };
      const signInDto = { id: 1, pass: "wrong-password" };

      // Mock bcrypt.compare to simulate unsuccessful password match
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Mock UsersService
      mockUsersService.findOne.mockResolvedValue(user);

      await expect(authService.signIn(signInDto.id, signInDto.pass)).rejects.toThrow(new UnauthorizedException("Invalid password"));
    });
  });
});
