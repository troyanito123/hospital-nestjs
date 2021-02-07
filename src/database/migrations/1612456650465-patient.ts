import {MigrationInterface, QueryRunner} from "typeorm";

export class patient1612456650465 implements MigrationInterface {
    name = 'patient1612456650465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "enrollment" character varying NOT NULL, "code" character varying NOT NULL, "company" character varying NOT NULL, "employer_number" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_779ac2dcf355f2982db53f4df6e" UNIQUE ("name"), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_779ac2dcf355f2982db53f4df6" ON "patients" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_779ac2dcf355f2982db53f4df6"`);
        await queryRunner.query(`DROP TABLE "patients"`);
    }

}
