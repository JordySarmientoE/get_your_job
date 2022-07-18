import { MigrationInterface, QueryRunner } from "typeorm";

export class firstTable1658097831500 implements MigrationInterface {
    name = 'firstTable1658097831500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "language_level" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9171b9f17b9a3679a2a61c059c6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "language" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "writtenLevelId" integer,
                "oralLevelId" integer,
                CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_info" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "lastname" character varying(255) NOT NULL,
                "dni" character varying(255) NOT NULL,
                "civil_status" character varying(255),
                "genre" character varying(255),
                "birthday" TIMESTAMP WITH TIME ZONE,
                "phone" character varying(255),
                "address" character varying(255),
                "nacionalty" character varying(255) NOT NULL,
                "photo" character varying(255),
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_profile" (
                "id" SERIAL NOT NULL,
                "salary_preference" numeric,
                "curriculum" character varying(255),
                "job_goal" character varying(255),
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "roleId" integer,
                "user_info_id" integer,
                "user_profile_id" integer,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "REL_ee24a311e8099f9f44424df108" UNIQUE ("user_info_id"),
                CONSTRAINT "REL_7e3ab9c810f081a945da68d74a" UNIQUE ("user_profile_id"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"),
                CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "language"
            ADD CONSTRAINT "FK_35d772e5281d8a4181ee6ee8686" FOREIGN KEY ("writtenLevelId") REFERENCES "language_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "language"
            ADD CONSTRAINT "FK_c5c19b34ba69faaa1394624802d" FOREIGN KEY ("oralLevelId") REFERENCES "language_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_ee24a311e8099f9f44424df108e" FOREIGN KEY ("user_info_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_7e3ab9c810f081a945da68d74a6" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_7e3ab9c810f081a945da68d74a6"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_ee24a311e8099f9f44424df108e"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"
        `);
        await queryRunner.query(`
            ALTER TABLE "language" DROP CONSTRAINT "FK_c5c19b34ba69faaa1394624802d"
        `);
        await queryRunner.query(`
            ALTER TABLE "language" DROP CONSTRAINT "FK_35d772e5281d8a4181ee6ee8686"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user_profile"
        `);
        await queryRunner.query(`
            DROP TABLE "user_info"
        `);
        await queryRunner.query(`
            DROP TABLE "language"
        `);
        await queryRunner.query(`
            DROP TABLE "language_level"
        `);
    }

}
