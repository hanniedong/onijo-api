import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  UpdateDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Field, ObjectType } from "@nestjs/graphql";
import { File } from './file.entity';
import { TeamEntity } from './team.entity';

@Entity('organizations')
@ObjectType()
export class OrganizationEntity {

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar', name: 'display_name' })
  @Field()
  displayName: string;

  @Column({ type: 'varchar' })
  @Field()
  league: string;

  @JoinColumn({ name: 'avatar_id' })
  @Field()
  @OneToOne(
    () => File,
    {
      eager: true,
      nullable: true
    }
  )
  public avatar?: File;

  @OneToMany(() => TeamEntity, team => team.organization)
  teams: TeamEntity[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}