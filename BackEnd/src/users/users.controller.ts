import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserResponse,
  FindAllParameters,
  UserRouteParameters,
  UsersDto,
} from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: UsersDto): Promise<CreateUserResponse> {
    return await this.usersService.create(user);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<UsersDto[]> {
    return await this.usersService.findAll(params);
  }

  @Put('/:id')
  async update(@Param() params: UserRouteParameters, @Body() task: UsersDto) {
    await this.usersService.update(params.id, task);
  }

  @Delete('/:id')
  remove(@Param() params: UserRouteParameters) {
    return this.usersService.remove(params.id);
  }
}
