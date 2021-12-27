import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from 'src/database/entities/team.entity';
import { OrganizationEntity } from 'src/database/entities/organization.entity';
import { TeamsService } from './teams.service';
import { TeamsResolver } from './teams.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, OrganizationEntity])],
  providers: [TeamsService, TeamsResolver],
  exports: [TeamsService],
})
export class TeamsModule { }