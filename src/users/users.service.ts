import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ProfileEntity } from 'src/database/entities/profile.entity';
import { UserEntity } from '../database/entities/user.entity';
import { FilesService } from 'src/files/files.service';
import { UserTeamMetadata } from 'src/database/entities/user-team-metadata.entity';
import { TeamEntity } from 'src/database/entities/team.entity';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUserAvatarArgs } from './dto/args/get-user-avatar.args';
import { ElasticSearchService } from 'src/elastic-search/elastic-search.service';
import { USERS_INDEX } from './users.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserTeamMetadata)
    private readonly userTeamMetadataRepo: Repository<UserTeamMetadata>,
    @InjectRepository(TeamEntity)
    private readonly teamRepo: Repository<TeamEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepo: Repository<ProfileEntity>,
    private readonly filesService: FilesService,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async createUser(createUserData) {
    const user: UserEntity = {
      uuid: uuidv4(),
      ...createUserData,
    };
    const hashedPassword = await bcrypt.hash(createUserData.password, 10);
    user.password = hashedPassword;
    try {
      return await this.userRepo.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new BadRequestException('User already created. Please login.');
      }
      console.log(`Error creating user. Error: ${e}`);
    }
  }

  async updateUserPhoneNumberConfirmation(userId): Promise<UserEntity> {
    await this.userRepo.update(userId, { isPhoneNumberConfirmed: true });
    return await this.userRepo.findOne(userId);
  }

  async upsertUserTeamMetadata(
    updateUserTeamMetadata,
    userId,
  ): Promise<UserTeamMetadata> {
    try {
      const user = await this.findUser(userId);
      const team = await this.teamRepo.findOne(updateUserTeamMetadata.teamId);

      const userTeamMetadata: UserTeamMetadata = {
        ...updateUserTeamMetadata,
      };
      userTeamMetadata.user = user;
      userTeamMetadata.team = team;
      return await this.userTeamMetadataRepo.save(userTeamMetadata);
    } catch (e) {
      if (e.code === '23505') {
        const existingUserTeamMetadata =
          await this.userTeamMetadataRepo.findOne({
            where: { user: userId, team: updateUserTeamMetadata.teamId },
          });
        const userTeamMetadata: UserTeamMetadata = {
          ...existingUserTeamMetadata,
        };
        userTeamMetadata.yearEnded = updateUserTeamMetadata.yearEnded;
        userTeamMetadata.yearJoined = updateUserTeamMetadata.yearJoined;
        return await this.userTeamMetadataRepo.save(userTeamMetadata);
      } else {
        throw e;
      }
    }
  }

  async getUserTeamMetadata(args: GetUserArgs): Promise<UserTeamMetadata[]> {
    const { id } = args;
    return await this.userTeamMetadataRepo.find({
      where: { user: id },
      relations: ['team', 'team.organization'],
    });
  }

  async findUser(options): Promise<any> {
    const user = await this.userRepo.findOne(options, { relations: [
      'profile',
      'userTeamMetadata',
      'userTeamMetadata.team',
      'userTeamMetadata.team.organization',
    ],});
    return user;
  }

  async addUserToElasticSearch(args): Promise<any> {
    try {
      const user = await this.userRepo.findOne(args, { relations: [
        'profile',
        'userTeamMetadata',
        'userTeamMetadata.team',
        'userTeamMetadata.team.organization',
      ],});
  
      const userData = {
        id: user.id,
        uuid: user.uuid,
        avatar: user.avatar,
        profile: user.profile,
        userTeamMetadata: user.userTeamMetadata, 
      }
  
     return await this.elasticSearchService.upsertDocument(USERS_INDEX, user.id, userData)
    } catch(e){
      throw e
    }
  }


  async getUserAvatar(userAvatarArgs: GetUserAvatarArgs): Promise<any> {
    return await this.userRepo.findOne({ where: userAvatarArgs });
  }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const user = await this.findUser(userId);
    await this.userRepo.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  public async searchUsers(query): Promise<any> {
    const { body } = await this.elasticSearchService.search({
      index: USERS_INDEX,
      body: {
        query: {
          multi_match: {
            query: query,
            fields: [
              'profile.firstName.keyword',
              'profile.lastName.keyword',
              'userTeamMetadata.team.displayName.keyword',
              'profile.job.keyword',
              'profile.company.keyword',
            ],
          },
        },
      },
    });
    const users = body.hits.hits.map((result) => ({
      id: result._source.id,
      uuid: result._source.uuid,
      avatar: result._source.avatar,
      profile: result._source.profile,
      userTeamMetadata: result._source.userTeamMetadata,
    }));
    return users;
  }

  public async getUsers(userIds): Promise<any> {
    const { body } = await this.elasticSearchService.search({
      index: USERS_INDEX,
      body: {
        query: {
          bool:{
            must: {
              terms:{
                "uuid.keyword": userIds
            }
          }
        }
      },
    },
  });
    const users = body.hits.hits.map((result) => ({
      id: result._source.id,
      uuid: result._source.uuid,
      avatar: result._source.avatar,
      profile: result._source.profile,
      userTeamMetadata: result._source.userTeamMetadata,
    }));
    return users;
  }

  public async getAllUsers(): Promise<any> {
    const { body } = await this.elasticSearchService.search({
      index: USERS_INDEX,
      sort: ["profile.firstName.keyword:asc"]
    });
    const users = body.hits.hits.map((result) => ({
      id: result._source.id,
      uuid: result._source.uuid,
      avatar: result._source.avatar,
      profile: result._source.profile,
      userTeamMetadata: result._source.userTeamMetadata,
    }));
    return users;
  }

  public async populateUsersInElasticSearch(): Promise<any> {
    const users = await this.userRepo.find({
      relations: [
        'profile',
        'userTeamMetadata',
        'userTeamMetadata.team',
        'userTeamMetadata.team.organization',
      ],
    });
    const { body: doesUserIndexExist } =
      await this.elasticSearchService.checkIndexExists(USERS_INDEX);
    if (doesUserIndexExist) {
      await this.elasticSearchService.deleteIndices(USERS_INDEX);
    }

    const usersData = users.map((user)=> ({
      id: user.id,
      uuid: user.uuid,
      avatar: user.avatar,
      profile: user.profile,
      userTeamMetadata: user.userTeamMetadata, 
    }))

    await this.elasticSearchService.createIndices(USERS_INDEX, {});
    const usersBulkUpload = await this.elasticSearchService.bulkUpload(
      usersData,
      USERS_INDEX,
    );
    return usersBulkUpload;
  }
}
