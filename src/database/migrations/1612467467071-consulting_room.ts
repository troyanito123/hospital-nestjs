import {MigrationInterface, QueryRunner} from "typeorm";

export class consultingRoom1612467467071 implements MigrationInterface {
    name = 'consultingRoom1612467467071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "consulting_rooms" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_10cbbea77d2415a91a3106cd4ff" UNIQUE ("name"), CONSTRAINT "PK_847797ba4210a8d1b2b92114bfe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "consulting_rooms"`);
    }

}
