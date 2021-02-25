import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusToUsers1614256470318 implements MigrationInterface {
    name = 'addStatusToUsers1614256470318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "status" character varying NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    }

}
