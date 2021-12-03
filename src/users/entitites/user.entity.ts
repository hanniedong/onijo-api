import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity('users')
@ObjectType()
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  username: string;

  @Column({ type: 'varchar', nullable: true, })
  @Field()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  email: string;

  @Column({ type: 'varchar', nullable: false, name: 'phone_number', unique: true })
  @Field()
  phoneNumber: string;

  @Column({ type: 'timestamptz', name: 'password_last_updated_at' })
  passwordLastUpdatedAt: Date;

  @Column({ type: 'timestamptz', name: 'last_verified_at' })
  lastVerifiedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    console.log("hashed")
    this.password = await bcrypt.hash(this.password, 10);
  }
}