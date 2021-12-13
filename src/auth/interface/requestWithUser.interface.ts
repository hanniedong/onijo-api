import { UserEntity } from '@users/entitites/user.entity';
import { Request } from 'express';


interface RequestWithUser extends Request {
  user: UserEntity;
}

export default RequestWithUser;