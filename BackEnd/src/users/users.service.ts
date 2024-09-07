import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { CreateUserResponse, FindAllParameters, UsersDto } from './users.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserEntity } from '../db/entities/user.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async findById(@Param('id') id: string) {
    const foundUser = await this.usersRepository.findOne({ where: { id: id } });

    if (!foundUser) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(foundUser);
  }

  async findAll(params: FindAllParameters): Promise<UsersDto[]> {
    const searchPrams: FindOptionsWhere<UsersDto> = {};

    if (params.username) {
      searchPrams.username = Like(`%${params.username}%`);
    }

    const tasksFound = await this.usersRepository.find({
      where: searchPrams,
    });

    return tasksFound.map((taskEntity) => this.mapEntityToDto(taskEntity));
  }

  async update(id: string, user: UsersDto) {
    const foundUser = await this.usersRepository.findOne({ where: { id } });

    if (!foundUser) {
      throw new HttpException(
        `User with id '${id}' not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersRepository.update(id, this.mapDtoToEntity(user));
  }

  async create(newUser: UsersDto): Promise<CreateUserResponse> {
    const userAlreadyRegistered = await this.findByUserName(newUser.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User '${newUser.username}' already registered`,
      );
    }

    const dbUser = new UserEntity();
    dbUser.username = newUser.username;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

    const { id, username } = await this.usersRepository.save(dbUser);
    return { id, username };
  }

  async remove(id: string) {
    const result = await this.usersRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByUserName(username: string): Promise<UsersDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.passwordHash,
    };
  }

  private mapEntityToDto(userEntity: UserEntity): UsersDto {
    return {
      id: userEntity.id,
      username: userEntity.username,
      password: userEntity.passwordHash,
    };
  }

  private mapDtoToEntity(userDto: UsersDto): Partial<UserEntity> {
    return {
      username: userDto.username,
      passwordHash: userDto.password,
    };
  }
}
