import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Field, ObjectType } from "@nestjs/graphql";
import PublicFile from 'src/files/entities/publicFile.entity';
import { OrganizationEntity } from 'src/organizations/entities/organization.entity';

@Entity('teams')
@ObjectType()
export class TeamEntity {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'varchar', name: 'display_name' })
  @Field()
  displayName: string;

  @Column({ type: 'varchar' })
  @Field()
  league: string;

  @JoinColumn({ name: 'organization_id' })
  @ManyToOne(() => OrganizationEntity, organization => organization.teams)
  organization: OrganizationEntity;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

}