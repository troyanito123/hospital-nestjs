import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.authenicate(password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { id, ...data } = user;
    return {
      data,
      access_token: this.jwtService.sign(user),
    };
  }

  renew(user: any) {
    const { id, iat, exp, ...data } = user;
    return {
      data,
      access_token: this.jwtService.sign(data),
    };
  }
}
