import { Module } from '@nestjs/common';
import { AuthModuleService } from './auth-module.service';
import { AuthModuleController } from './auth-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ User ])],
  controllers: [AuthModuleController],
  providers: [AuthModuleService]
})
export class AuthModuleModule {}
