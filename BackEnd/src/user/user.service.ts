import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(login: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { login },
      select: ['login', 'password'], // Inclua o password aqui
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(dtoCreate: CreateUserDto) {
    const user = new User();
    user.nome = dtoCreate.nome;
    user.password = dtoCreate.password;
    user.login = dtoCreate.login;
    this.userRepository.save(user);
    return 'This action adds a new user';
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      return `This action returns the name: ${user.nome}`;
    } else {
      return 'User not found';
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    await this.userRepository.update(id, {
      nome: updateUserDto.nome,
      password: updateUserDto.password,
      login: updateUserDto.login,
    });

    return `This action updates the user with ID #${id} to the name ${updateUserDto.nome}`;
  }

  async remove(id: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return `User com o ID #${id} não foi encontrado.`;
    }
    await this.userRepository.remove(user);
    return `This action removes the user with ID #${id}`;
  }
}
