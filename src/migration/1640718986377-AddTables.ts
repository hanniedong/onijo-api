import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTables1640718986377 implements MigrationInterface {
    name = 'AddTables1640718986377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profiles" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "birthday" TIMESTAMP WITH TIME ZONE NOT NULL, "job" character varying, "company" character varying, "study" character varying, "education" character varying, "bio" character varying, "team_status" character varying, "mentorship_role" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1ec6662219f4605723f1e41b6cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" character varying, "email" character varying, "phone_number" character varying, "password_last_updated_at" TIMESTAMP WITH TIME ZONE, "is_phone_number_confirmed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "profile_id" integer, "avatar_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_23371445bd80cb3e413089551b" UNIQUE ("profile_id"), CONSTRAINT "REL_c3401836efedec3bec459c8f81" UNIQUE ("avatar_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_team_metadata" ("id" SERIAL NOT NULL, "year_joined" integer, "year_ended" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "team_id" integer, CONSTRAINT "user_team_exists" UNIQUE ("user_id", "team_id"), CONSTRAINT "PK_e238125fc90f08ad60472f01392" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" SERIAL NOT NULL, "display_name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "organization_id" integer, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organizations" ("id" SERIAL NOT NULL, "display_name" character varying NOT NULL, "league" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "avatar_id" integer, CONSTRAINT "REL_d6333153367f724d0ddee47220" UNIQUE ("avatar_id"), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c3401836efedec3bec459c8f818" FOREIGN KEY ("avatar_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_team_metadata" ADD CONSTRAINT "FK_cb67ea74cfdc594f6e82fadcf63" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_team_metadata" ADD CONSTRAINT "FK_4538c1e0617d60c4cfddae45100" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_fdc736f761896ccc179c823a785" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "FK_d6333153367f724d0ddee472209" FOREIGN KEY ("avatar_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "FK_d6333153367f724d0ddee472209"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_fdc736f761896ccc179c823a785"`);
        await queryRunner.query(`ALTER TABLE "user_team_metadata" DROP CONSTRAINT "FK_4538c1e0617d60c4cfddae45100"`);
        await queryRunner.query(`ALTER TABLE "user_team_metadata" DROP CONSTRAINT "FK_cb67ea74cfdc594f6e82fadcf63"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c3401836efedec3bec459c8f818"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "user_team_metadata"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_profiles"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
