import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleOptions, Roles } from '../role/decorators/role.decorator';
import { RolesGuard } from 'src/role/guards/role.guard';
import { FindByEmailDto } from './dto/find-by-email.dto';
import { FindAllParamsUser } from './dto/find-all-params-user';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('email')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  async findByEmail(@Body() body: FindByEmailDto) {
    const user = await this.userService.findByEmail(body.email);
    if (user) {
      return { exists: true };
    }
    return { exists: false };
  }

  @Post()
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  findAll(@Query() query: FindAllParamsUser) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: `The id: ${id} does not exist`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
