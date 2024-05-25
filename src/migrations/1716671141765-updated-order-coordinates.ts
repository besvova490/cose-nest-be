import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedOrderCoordinates1716671141765 implements MigrationInterface {
    name = 'UpdatedOrderCoordinates1716671141765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_4fa992eb0133cd958978cddf22d"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "ref"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "ref" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_4fa992eb0133cd958978cddf22d" UNIQUE ("ref")`);
    }

}
