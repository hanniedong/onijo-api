import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity('users')
@ObjectType()
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @Field()
  username: string;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  password: string;

  @Column({ type: 'varchar', nullable: false })
  @Field()
  email: string;

  @CreateDateColumn() createdOn?: Date;

  @CreateDateColumn() updatedOn?: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}