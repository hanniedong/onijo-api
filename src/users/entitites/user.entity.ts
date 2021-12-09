import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  BeforeInsert,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProfileEntity } from 'src/user_profiles/entities/profile.entity';

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

  @Column({ type: 'timestamptz', name: 'password_last_updated_at', nullable: true })
  passwordLastUpdatedAt: Date;

  @Column({ default: false })
  isPhoneNumberConfirmed: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    console.log("hashed")
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Field()
  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;
}