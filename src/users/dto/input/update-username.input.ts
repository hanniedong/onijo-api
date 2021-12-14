import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUsernameInput {

  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  username: string;
}