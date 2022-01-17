import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetCommunitiesArgs {
  @Field()
  @IsNotEmpty()
  query: string;
}
