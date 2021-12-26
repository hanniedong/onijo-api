import { IsNotEmpty } from 'class-validator';

export class UpdateUserTeamMetadataDto {
  @IsNotEmpty()
  teamId: number;

  @IsNotEmpty()
  yearJoined: number;

  yearEnded: number;
}