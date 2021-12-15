import { Body, Controller, Put } from '@nestjs/common';
import { updateUserStatus } from 'src/users/dto/updateUserStatus.input';
import { User } from 'src/users/user';
import { UsersService } from 'src/users/users.service';

@Controller('brain-waves')
export class BrainWavesController {
  constructor(private usersService: UsersService) {}

  @Put()
  updateHpAndMp(@Body() user: updateUserStatus): Promise<User> {
    return this.usersService.updateHpAndMp(user);
  }
}
