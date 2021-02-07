import {MigrationInterface, QueryRunner} from "typeorm";

export class addCreatedAndUpdatedAtToConsultingRooms1612468024715 implements MigrationInterface {
    name = 'addCreatedAndUpdatedAtToConsultingRooms1612468024715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consulting_rooms" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "consulting_rooms" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consulting_rooms" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "consulting_rooms" DROP COLUMN "created_at"`);
    }

}
