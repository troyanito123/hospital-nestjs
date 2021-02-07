import {MigrationInterface, QueryRunner} from "typeorm";

export class userpassword1612398181888 implements MigrationInterface {
    name = 'userpassword1612398181888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
