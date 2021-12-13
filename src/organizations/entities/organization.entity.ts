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
import PublicFile from 'src/files/entities/publicFile.entity';
import { TeamEntity } from 'src/teams/entities/team.entity';

@Entity('organizations')
@ObjectType()
export class OrganizationEntity {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'varchar', name: 'display_name' })
  @Field()
  displayName: string;

  @Column({ type: 'varchar' })
  @Field()
  league: string;

  @JoinColumn({ name: 'avatar_id' })
  @OneToOne(
    () => PublicFile,
    {
      eager: true,
      nullable: true
    }
  )
  public avatar?: PublicFile;

  @OneToMany(() => TeamEntity, team => team.organization)
  teams: TeamEntity[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

}