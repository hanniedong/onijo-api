import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('user_profiles')
@ObjectType()
export class ProfileEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Field()
  @Column({ type: 'varchar', name: 'last_name' })
  lastName?: string;

  @Column({ type: 'timestamptz' })
  birthday: Date;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  job?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  company: string | null;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  study: string | null;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  education: string | null;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', nullable: true, name: 'team_status' })
  @Field({ nullable: true })
  teamStatus: string | null;

  @Column({ type: 'varchar', nullable: true, name: 'mentorship_role' })
  @Field({ nullable: true })
  mentorshipRole: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}