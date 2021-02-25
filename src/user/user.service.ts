import { Injectable } from '@nestjs/common';
import { RoleCode } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllParamsUser } from './dto/find-all-params-user';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatus } from './entities/user.entity';
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

  async findAll(query: FindAllParamsUser) {
    const resp = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.status = :status', { status: UserStatus.ACTIVE })
      .andWhere('user.name ILIKE :filter', {
        filter: `%${query.filter || ''}%`,
      })
      .select('user.id')
      .addSelect('user.name')
      .addSelect('user.email')
      .addSelect('user.status')
      .addSelect('role.code')
      .skip(query.pageNumber * query.pageSize || 0)
      .take(query.pageSize || 10)
      .orderBy('user.name', query.sortOrder || 'ASC')
      .getManyAndCount();
    return {
      count: resp[1],
      data: resp[0],
    };
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
