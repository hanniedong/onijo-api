import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  BeforeInsert,
  UpdateDateColumn,
  JoinColumn,
  Generated,
  OneToMany
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Field, ObjectType } from "@nestjs/graphql";
import { ProfileEntity } from './profile.entity';
import { File } from './file.entity';
import { UserTeamMetadata } from './user-team-metadata.entity';
import { isEmail } from 'class-validator';

@Entity('users')
@ObjectType()
export class UserEntity {

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

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

  @BeforeInsert()
  async hashPassword() {
    console.log("hashed")
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Field()
  @OneToOne(() => ProfileEntity)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @Field()
  @OneToMany(type => UserTeamMetadata, userTeamMetadata => userTeamMetadata.id)
  @JoinColumn({ name: 'user_team_metadata_id' })
  userTeamMetadata: UserTeamMetadata;

  @JoinColumn({ name: 'avatar_id' })
  @OneToOne(
    () => File,
    {
      eager: true,
      nullable: true
    }
  )
  public avatar?: File;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}