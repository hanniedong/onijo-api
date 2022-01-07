import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_profiles')
@ObjectType()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Field()
  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Field()
  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'timestamptz' })
  birthday: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  job: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  company: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  study: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  education: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  bio: string;

  @Column({ type: 'varchar', nullable: true, name: 'team_status' })
  @Field({ nullable: true })
  teamStatus: string;

  @Column({ type: 'varchar', nullable: true, name: 'mentorship_role' })
  @Field({ nullable: true })
  mentorshipRole: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
