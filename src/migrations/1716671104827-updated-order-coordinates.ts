import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedOrderCoordinates1716671104827 implements MigrationInterface {
    name = 'UpdatedOrderCoordinates1716671104827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "latitude" numeric(10,6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "longitude" numeric(10,6) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "longitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "latitude" integer NOT NULL`);
    }

}
