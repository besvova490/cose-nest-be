import { MigrationInterface, QueryRunner } from "typeorm";

export class DocumentUrlUniqOff1710423091199 implements MigrationInterface {
    name = 'DocumentUrlUniqOff1710423091199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "UQ_49cf87614865cceff86847dcad9"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "UQ_49cf87614865cceff86847dcad9" UNIQUE ("url")`);
    }

}
