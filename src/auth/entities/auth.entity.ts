import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthEntity {
  @Field()
  id: number;

  @Field()
  uuid: string;

  @Field()
  token: string;

  @Field({nullable: true})
  username: string;
}
