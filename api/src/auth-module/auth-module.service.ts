import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthModuleService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // TODO: implement this with session
  async getCurrentUser() {
    const currentUser = await this.userRepository.findOneBy({ id: 3 });
    return currentUser;
  }
}
