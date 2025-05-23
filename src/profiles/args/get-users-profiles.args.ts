import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetUsersProfilesArgs {
  @Field()
  @IsNotEmpty()
  query: string;
}
