import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private roleRespository: RoleRepository) {}
  create(createRoleDto: CreateRoleDto) {
    const newRole = this.roleRespository.create(createRoleDto);
    return this.roleRespository.save(newRole);
  }

  async findAll() {
    return this.roleRespository.find();
  }

  findOne(id: number) {
    return this.roleRespository.findOne(id);
  }

  findByCode(code: string) {
    return this.roleRespository.findOne({ where: { code } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRespository.findOne(id);
    this.roleRespository.merge(role, updateRoleDto);
    return this.roleRespository.save(role);
  }

  async remove(id: number) {
    await this.roleRespository.delete(id);
    return true;
  }
}
