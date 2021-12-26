import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType } from "@nestjs/graphql";
import { UserEntity } from './user.entity';
import { TeamEntity } from './team.entity';

@Entity('user_team_metadata')
@ObjectType()
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

  @ManyToOne(type => UserEntity, user => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(type => TeamEntity, team => team.id)
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team: TeamEntity;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}