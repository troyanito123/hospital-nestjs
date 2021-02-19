import { Injectable } from '@nestjs/common';
import { RoleCode } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PasswordEncrypter } from './password-encrypter';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = PasswordEncrypter.encrypt(createUserDto.password);
    if (createUserDto.roleId) {
      newUser.role = await this.roleService.findOne(createUserDto.roleId);
    } else {
      newUser.role = await this.roleService.findByCode(RoleCode.USER);
    }
    const userDB = await this.userRepository.save(newUser);
    const { password, ...result } = userDB;
    return result;
  }

  findAll() {
    return this.userRepository.find({
      select: ['id', 'email', 'name'],
      relations: ['role'],
    });
  }

  async findOne(id: number) {
    const userDB = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
      relations: ['role'],
    });
    if (!userDB) {
      return null;
    }
    return userDB;
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
