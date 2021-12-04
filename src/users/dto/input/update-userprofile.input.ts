import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserProfileInput {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  job: string;

  @Field()
  @IsNotEmpty()
  company: string;

  @Field()
  @IsNotEmpty()
  study: string;

  @Field()
  @IsNotEmpty()
  education: string;

  @Field()
  @IsNotEmpty()
  bio: string;
}