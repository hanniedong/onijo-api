import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsToUserProfile1638575362877 implements MigrationInterface {
    name = 'AddColumnsToUserProfile1638575362877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "job" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "company" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "study" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "education" character varying`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "bio" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "education"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "study"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "job"`);
    }

}
