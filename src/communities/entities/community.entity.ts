import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Community {
  @Field()
  public communityId: string;

  @Field()
  public displayName: string;

  @Field()
  public description: string;

  @Field({nullable:true})
  public avatarFileId: string;

  @Field()
  public membersCount: number;
}
