import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // Import du repository TypeORM pour l'entité User
  ],
  controllers: [UserController],  // Déclare le contrôleur
  providers: [UserService],  // Déclare le service
  exports: [UserService],  // Permet d'exporter le service si besoin dans d'autres modules
})
export class UserModule {}