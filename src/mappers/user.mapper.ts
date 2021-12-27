import { UserEntity } from 'src/database/entities/user.entity';
import { UserDto } from '../users/dto/user.dto';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, email, phoneNumber } = data;

  let userDto: UserDto = {
    id,
    email,
    phoneNumber
  };

  return userDto;
};