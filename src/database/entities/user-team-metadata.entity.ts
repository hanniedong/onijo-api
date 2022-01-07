import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Field, ObjectType } from "@nestjs/graphql";
import { UserEntity } from './user.entity';
import { TeamEntity } from './team.entity';

@Entity('user_team_metadata')
@ObjectType()
@Unique('user_team_exists', ['user', 'team'])
export class UserTeamMetadata {

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'integer', nullable: true, name: 'year_joined' })
  @Field()
  yearJoined: number;

  @Column({ type: 'integer', nullable: true, name: 'year_ended' })
  @Field()
  yearEnded: number;

  @ManyToOne(type => UserEntity, user => user.userTeamMetadata)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @Field({nullable:true})
  @ManyToOne(type => TeamEntity, team => team.userTeamMetadata)
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team: TeamEntity;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}