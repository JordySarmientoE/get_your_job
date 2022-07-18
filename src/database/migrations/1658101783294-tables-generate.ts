import { MigrationInterface, QueryRunner } from "typeorm";

export class tablesGenerate1658101783294 implements MigrationInterface {
    name = 'tablesGenerate1658101783294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "language_common" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_e2d5148b4951d09755288c7d523" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "companies" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "publication_day" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d8c4aa214a07e3819d4d499e985" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "publication_type" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_7ed367624a5d5eaab7a090a7580" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "publication_detail" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "description" character varying(255) NOT NULL,
                "salary" numeric,
                "address" character varying(255),
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "typeId" integer,
                "dayTypeId" integer,
                CONSTRAINT "PK_f3316dc52620f28a619a2daca59" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "publications" (
                "id" SERIAL NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "publication_detail_id" integer,
                "ownerId" integer,
                CONSTRAINT "REL_7d9479dec9d7133430df69975c" UNIQUE ("publication_detail_id"),
                CONSTRAINT "PK_2c4e732b044e09139d2f1065fae" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "applications" (
                "id" SERIAL NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "userId" integer,
                "publicationId" integer,
                CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "study_status" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_c20c2c26b67f0059035dbbcc85a" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "study_type" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_ff191ecdf04907a3e93f6f2e452" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "studies" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "institution" character varying(255) NOT NULL,
                "country" character varying(255) NOT NULL,
                "present" boolean NOT NULL DEFAULT false,
                "start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
                "end_date" TIMESTAMP WITH TIME ZONE NOT NULL,
                "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "typeId" integer,
                "statusId" integer,
                CONSTRAINT "PK_b100ff0c4a0ad02a9c2270d45b6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "language"
            ADD "languageCommonId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "companyId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "language"
            ALTER COLUMN "name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "language"
            ADD CONSTRAINT "FK_8eb130b4f6c82635447a83ac29d" FOREIGN KEY ("languageCommonId") REFERENCES "language_common"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "publication_detail"
            ADD CONSTRAINT "FK_7976bc0afc703c7281cc2382b24" FOREIGN KEY ("typeId") REFERENCES "publication_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "publication_detail"
            ADD CONSTRAINT "FK_fd18bfb2e6ee6ae15dd4b8e8e9f" FOREIGN KEY ("dayTypeId") REFERENCES "publication_day"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "publications"
            ADD CONSTRAINT "FK_7d9479dec9d7133430df69975c9" FOREIGN KEY ("publication_detail_id") REFERENCES "publication_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "publications"
            ADD CONSTRAINT "FK_1f8c8e6f10c1958c96e092d8eb0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "applications"
            ADD CONSTRAINT "FK_90ad8bec24861de0180f638b9cc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "applications"
            ADD CONSTRAINT "FK_dd50fb08e9e794fb120ccf9a9c1" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "studies"
            ADD CONSTRAINT "FK_d750b4a99260d334601e10ac768" FOREIGN KEY ("typeId") REFERENCES "study_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "studies"
            ADD CONSTRAINT "FK_6316910e91cfd30b308cd5be0cc" FOREIGN KEY ("statusId") REFERENCES "study_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "studies" DROP CONSTRAINT "FK_6316910e91cfd30b308cd5be0cc"
        `);
        await queryRunner.query(`
            ALTER TABLE "studies" DROP CONSTRAINT "FK_d750b4a99260d334601e10ac768"
        `);
        await queryRunner.query(`
            ALTER TABLE "applications" DROP CONSTRAINT "FK_dd50fb08e9e794fb120ccf9a9c1"
        `);
        await queryRunner.query(`
            ALTER TABLE "applications" DROP CONSTRAINT "FK_90ad8bec24861de0180f638b9cc"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"
        `);
        await queryRunner.query(`
            ALTER TABLE "publications" DROP CONSTRAINT "FK_1f8c8e6f10c1958c96e092d8eb0"
        `);
        await queryRunner.query(`
            ALTER TABLE "publications" DROP CONSTRAINT "FK_7d9479dec9d7133430df69975c9"
        `);
        await queryRunner.query(`
            ALTER TABLE "publication_detail" DROP CONSTRAINT "FK_fd18bfb2e6ee6ae15dd4b8e8e9f"
        `);
        await queryRunner.query(`
            ALTER TABLE "publication_detail" DROP CONSTRAINT "FK_7976bc0afc703c7281cc2382b24"
        `);
        await queryRunner.query(`
            ALTER TABLE "language" DROP CONSTRAINT "FK_8eb130b4f6c82635447a83ac29d"
        `);
        await queryRunner.query(`
            ALTER TABLE "language"
            ALTER COLUMN "name"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "companyId"
        `);
        await queryRunner.query(`
            ALTER TABLE "language" DROP COLUMN "languageCommonId"
        `);
        await queryRunner.query(`
            DROP TABLE "studies"
        `);
        await queryRunner.query(`
            DROP TABLE "study_type"
        `);
        await queryRunner.query(`
            DROP TABLE "study_status"
        `);
        await queryRunner.query(`
            DROP TABLE "applications"
        `);
        await queryRunner.query(`
            DROP TABLE "publications"
        `);
        await queryRunner.query(`
            DROP TABLE "publication_detail"
        `);
        await queryRunner.query(`
            DROP TABLE "publication_type"
        `);
        await queryRunner.query(`
            DROP TABLE "publication_day"
        `);
        await queryRunner.query(`
            DROP TABLE "companies"
        `);
        await queryRunner.query(`
            DROP TABLE "language_common"
        `);
    }

}
