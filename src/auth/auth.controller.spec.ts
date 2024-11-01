import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { JwtService } from "@nestjs/jwt";
import { AuthenticatedRequest } from "./types";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn((id: number, password: string) => Promise.resolve({ access_token: "test-token" })),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        JwtService, // Mock or provide the JwtService as needed
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe("signIn", () => {
    it("should return a JWT token", async () => {
      const signInDto = { id: 1, password: "password" };
      const result = await authController.signIn(signInDto);
      expect(result).toEqual({ access_token: "test-token" });
      expect(authService.signIn).toHaveBeenCalledWith(signInDto.id, signInDto.password);
    });
  });

  describe("getProfile", () => {
    it("should return the user profile", () => {
      const request = {
        user: { id: 1, firstName: "John" },
      } as unknown as AuthenticatedRequest;

      const result = authController.getProfile(request);
      expect(result).toEqual(request.user);
    });
  });
});
