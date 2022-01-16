import { UserEntity } from 'src/database/entities/user.entity';
import { UserDto } from '../users/dto/user.dto';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, email, uuid, phoneNumber } = data;

  let userDto: UserDto = {
    id,
    uuid,
    email,
    phoneNumber
  };

  return userDto;
};