import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  // TODO: use email instead of password and id
  async signIn(
    id: number,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const match = await bcrypt.compare(pass, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, firstName: user.firstName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
