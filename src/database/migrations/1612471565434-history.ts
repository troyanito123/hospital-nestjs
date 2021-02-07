import {MigrationInterface, QueryRunner} from "typeorm";

export class history1612471565434 implements MigrationInterface {
    name = 'history1612471565434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "histories" ("id" SERIAL NOT NULL, "laboratories" integer NOT NULL DEFAULT '0', "x_ray" integer NOT NULL DEFAULT '0', "recipes" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "patientId" integer, "consultingRoomId" integer, CONSTRAINT "PK_36b0e707452a8b674f9d95da743" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "histories" ADD CONSTRAINT "FK_0c320e3e56813ce3b175add32ba" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "histories" ADD CONSTRAINT "FK_c77cb432ebd4a50cd3eb468f4f0" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "histories" ADD CONSTRAINT "FK_6147dfc835ea3f157c2e91b97be" FOREIGN KEY ("consultingRoomId") REFERENCES "consulting_rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "histories" DROP CONSTRAINT "FK_6147dfc835ea3f157c2e91b97be"`);
        await queryRunner.query(`ALTER TABLE "histories" DROP CONSTRAINT "FK_c77cb432ebd4a50cd3eb468f4f0"`);
        await queryRunner.query(`ALTER TABLE "histories" DROP CONSTRAINT "FK_0c320e3e56813ce3b175add32ba"`);
        await queryRunner.query(`DROP TABLE "histories"`);
    }

}
