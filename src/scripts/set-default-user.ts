import { ConfigService } from '@nestjs/config';
import { getRepository } from 'typeorm';

import { ConfigOptions } from '../config/config';
import { Role } from '../role/entities/role.entity';
import { User } from '../user/entities/user.entity';

const setDefaultUser = async (configService: ConfigService) => {
  const userRepository = getRepository<User>(User);
  const roleRepository = getRepository<Role>(Role);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('email = :email', {
      email: configService.get(ConfigOptions.defaultUserEmail),
    })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
      name: configService.get(ConfigOptions.defaultUserName),
      email: configService.get(ConfigOptions.defaultUserEmail),
      password: configService.get(ConfigOptions.defaultUserPassword),
      role: await roleRepository.findOne({ where: { code: 'ADMIN' } }),
    });
    return await userRepository.save(adminUser);
  }
};

export default setDefaultUser;
