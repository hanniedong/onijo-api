import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Field, ObjectType } from "@nestjs/graphql";
import { OrganizationEntity } from './organization.entity';
import { UserTeamMetadata } from './user-team-metadata.entity';

@Entity('teams')
@ObjectType()
export class TeamEntity {

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar', name: 'display_name' })
  @Field()
  displayName: string;

  @OneToMany(type => UserTeamMetadata, userTeamMetadata => userTeamMetadata.id)
  userTeamMetadata: UserTeamMetadata;

  @JoinColumn({ name: 'organization_id' })
  @Field()
  @ManyToOne(() => OrganizationEntity, organization => organization.teams)
  organization: OrganizationEntity;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}