import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,  // Injecte le repository pour l'entité User
  ) {}

  // Créer un nouvel utilisateur
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Récupérer un utilisateur par son ID
  async findOne(id: string): Promise<User> {
    const objectId = new ObjectId(id);
    const user = await this.userRepository.findOneBy({ id: objectId });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Mettre à jour un utilisateur
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  // Supprimer un utilisateur
  async remove(id: string): Promise<void> {
    const objectId = new ObjectId(id);
    const result = await this.userRepository.delete({ id: objectId });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}