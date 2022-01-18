import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class SearchUsersArgs {
  @Field()
  @IsNotEmpty()
  query: string;
}
