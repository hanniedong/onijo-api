import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SmsEntity {
  @Field({nullable: true})
  valid: boolean;

  @Field({nullable: true})
  status: string;
}
