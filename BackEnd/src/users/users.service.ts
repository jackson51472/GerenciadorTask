import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserResponse, UsersDto } from './users.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { UserEntity } from '../db/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

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
}
