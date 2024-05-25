import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedOrderModel1716668200063 implements MigrationInterface {
    name = 'UpdatedOrderModel1716668200063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "orderDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "longitude" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderDate"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "title"`);
    }

}
