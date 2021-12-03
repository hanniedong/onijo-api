import { Field, ObjectType } from "@nestjs/graphql";
import { UserEntity } from "@users/entitites/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

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
  lastName: string;

  @Column({ type: 'timestamptz' })
  birthday: String;

  @Field()
  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}