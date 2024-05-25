import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedOrdersTable1712151758681 implements MigrationInterface {
    name = 'UpdatedOrdersTable1712151758681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "serviceId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD "serviceRequesterId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD "serviceChampionId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_c721e93645fdc15f040096d1eaa" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_814fac5ed3bea73b0789a56e6b9" FOREIGN KEY ("serviceRequesterId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_ef5f3007f0e90e97f837058bd3c" FOREIGN KEY ("serviceChampionId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_ef5f3007f0e90e97f837058bd3c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_814fac5ed3bea73b0789a56e6b9"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_c721e93645fdc15f040096d1eaa"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "serviceChampionId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "serviceRequesterId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "serviceId"`);
    }

}
