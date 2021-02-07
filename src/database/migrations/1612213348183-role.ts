import {MigrationInterface, QueryRunner} from "typeorm";

export class role1612213348183 implements MigrationInterface {
    name = 'role1612213348183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_ee999bb389d7ac0fd967172c41f" UNIQUE ("code"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
