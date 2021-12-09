import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserTable1639015859270 implements MigrationInterface {
    name = 'AddUserTable1639015859270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public_file" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_bf2f5ba5aa6e3453b04cb4e4720" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profiles" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "birthday" TIMESTAMP WITH TIME ZONE NOT NULL, "avatar" character varying, "job" character varying, "company" character varying, "study" character varying, "education" character varying, "bio" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1ec6662219f4605723f1e41b6cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying, "password" character varying, "email" character varying, "phone_number" character varying NOT NULL, "password_last_updated_at" TIMESTAMP WITH TIME ZONE, "isPhoneNumberConfirmed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "profileId" integer, "avatarId" integer, CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "REL_3e1f52ec904aed992472f2be14" UNIQUE ("avatarId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3e1f52ec904aed992472f2be147" FOREIGN KEY ("avatarId") REFERENCES "public_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3e1f52ec904aed992472f2be147"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_profiles"`);
        await queryRunner.query(`DROP TABLE "public_file"`);
    }

}
