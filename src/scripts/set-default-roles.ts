import { getRepository } from 'typeorm';
import { Role } from '../role/entities/role.entity';

const setDefaultRole = async () => {
  const roleRepository = getRepository<Role>(Role);

  const roleAdmin = await roleRepository
    .createQueryBuilder()
    .where('code = :code', {
      code: 'ADMIN',
    })
    .getOne();

  if (!roleAdmin) {
    const newAdminRole = roleRepository.create({
      name: 'Administrator',
      code: 'ADMIN',
      description: 'Can do anything',
    });
    await roleRepository.save(newAdminRole);
  }

  const roleUser = await roleRepository
    .createQueryBuilder()
    .where('code = :code', {
      code: 'USER',
    })
    .getOne();

  if (!roleUser) {
    const newRoleUser = roleRepository.create({
      name: 'Usuer',
      code: 'USER',
      description: 'can not create users',
    });
    await roleRepository.save(newRoleUser);
  }
};

export default setDefaultRole;
