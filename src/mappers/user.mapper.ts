import { UserEntity } from '@users/entitites/user.entity';
import { UserDto } from '../users/dto/user.dto';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email, phoneNumber } = data;

  let userDto: UserDto = {
    id,
    username,
    email,
    phoneNumber
  };

  return userDto;
};