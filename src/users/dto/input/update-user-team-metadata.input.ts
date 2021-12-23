import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserTeamMetadataInput {
  @Field()
  @IsNotEmpty()
  userId: number;

  @Field()
  @IsNotEmpty()
  teamId: number;

  @Field()
  @IsNotEmpty()
  yearJoined: number;
}