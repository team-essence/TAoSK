import {
  Body,
  Controller,
  Put,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { updateUserStatus } from 'src/users/dto/updateUserStatus.input';
import { User } from 'src/users/user';
import { UsersResolver } from 'src/users/users.resolver';
import { UsersService } from 'src/users/users.service';

@Controller('brain-waves')
export class BrainWavesController {
  constructor(
    private usersService: UsersService,
    private usersResolver: UsersResolver,
  ) {}

  @Put()
  async updateHpAndMp(@Body() user: updateUserStatus): Promise<User> {
    const userData = await this.usersService.updateHpAndMp(user);

    this.usersResolver.updateHpAndMp(userData.id);

    return userData;
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserHpMp(id);
  }
}
