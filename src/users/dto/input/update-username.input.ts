import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUsernameInput {

  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  username: string;
}