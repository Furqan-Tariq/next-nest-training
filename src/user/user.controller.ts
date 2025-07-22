import { Controller, Get} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all-users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('active-users')
  async getActiveUsers(): Promise<User[]> {
    return this.userService.findActive();
  }
}
