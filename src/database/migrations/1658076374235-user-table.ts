import { MigrationInterface, QueryRunner } from "typeorm";

export class userTable1658076374235 implements MigrationInterface {
    name = 'userTable1658076374235'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "roleId" integer,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
    }

}