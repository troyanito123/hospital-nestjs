import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusToHistories1612474505316 implements MigrationInterface {
    name = 'addStatusToHistories1612474505316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "histories" ADD "status" character varying NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "histories" DROP COLUMN "status"`);
    }

}
