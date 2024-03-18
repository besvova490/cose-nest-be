import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProfileModel1710769718404 implements MigrationInterface {
    name = 'UpdateProfileModel1710769718404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_06e08c500d8d22db40e6c70b760"`);
        await queryRunner.query(`CREATE TABLE "service_service_participators_profile" ("serviceId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_71d80aa8c39ab5b43be3b5e7fd5" PRIMARY KEY ("serviceId", "profileId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_83a097fb1c4bf16d13b09b3d79" ON "service_service_participators_profile" ("serviceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c9f1c89167f99c0027abaa053" ON "service_service_participators_profile" ("profileId") `);
        await queryRunner.query(`CREATE TABLE "service_service_champions_profile" ("serviceId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_1b5e2c657ddc89b94115a116507" PRIMARY KEY ("serviceId", "profileId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ff965e15620b8c0fed1b194668" ON "service_service_champions_profile" ("serviceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b33cccdc89c49133ad2ae9eb7" ON "service_service_champions_profile" ("profileId") `);
        await queryRunner.query(`CREATE TABLE "profile_services_service" ("profileId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_13854f466201ce1266924798938" PRIMARY KEY ("profileId", "serviceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1a341548d651606fab3c7bcf30" ON "profile_services_service" ("profileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_29a37ec9e3a8237f5cf396a945" ON "profile_services_service" ("serviceId") `);
        await queryRunner.query(`CREATE TABLE "profile_requested_services_service" ("profileId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_870f4cbcbf5b35c53b3b131895d" PRIMARY KEY ("profileId", "serviceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f6f4ff164ef416f5175793e2b5" ON "profile_requested_services_service" ("profileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_37e0a3e2411a4af1548ae1653b" ON "profile_requested_services_service" ("serviceId") `);
        await queryRunner.query(`CREATE TABLE "review_reviewer_profile" ("reviewId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_b526ef1fb5872649396c2a1ef14" PRIMARY KEY ("reviewId", "profileId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c30ba577bafb0404aa11fcfddd" ON "review_reviewer_profile" ("reviewId") `);
        await queryRunner.query(`CREATE INDEX "IDX_adebd287fcc3a86e3769e074e9" ON "review_reviewer_profile" ("profileId") `);
        await queryRunner.query(`ALTER TABLE "profile" ADD "feedbacksId" integer`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_ca0091955d027de6c31b6ae2e90" FOREIGN KEY ("feedbacksId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_06e08c500d8d22db40e6c70b760" FOREIGN KEY ("reviewedId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_service_participators_profile" ADD CONSTRAINT "FK_83a097fb1c4bf16d13b09b3d79c" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_service_participators_profile" ADD CONSTRAINT "FK_3c9f1c89167f99c0027abaa0537" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_service_champions_profile" ADD CONSTRAINT "FK_ff965e15620b8c0fed1b1946684" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_service_champions_profile" ADD CONSTRAINT "FK_1b33cccdc89c49133ad2ae9eb70" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profile_services_service" ADD CONSTRAINT "FK_1a341548d651606fab3c7bcf305" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profile_services_service" ADD CONSTRAINT "FK_29a37ec9e3a8237f5cf396a945f" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile_requested_services_service" ADD CONSTRAINT "FK_f6f4ff164ef416f5175793e2b5b" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profile_requested_services_service" ADD CONSTRAINT "FK_37e0a3e2411a4af1548ae1653b8" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review_reviewer_profile" ADD CONSTRAINT "FK_c30ba577bafb0404aa11fcfddd0" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review_reviewer_profile" ADD CONSTRAINT "FK_adebd287fcc3a86e3769e074e97" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review_reviewer_profile" DROP CONSTRAINT "FK_adebd287fcc3a86e3769e074e97"`);
        await queryRunner.query(`ALTER TABLE "review_reviewer_profile" DROP CONSTRAINT "FK_c30ba577bafb0404aa11fcfddd0"`);
        await queryRunner.query(`ALTER TABLE "profile_requested_services_service" DROP CONSTRAINT "FK_37e0a3e2411a4af1548ae1653b8"`);
        await queryRunner.query(`ALTER TABLE "profile_requested_services_service" DROP CONSTRAINT "FK_f6f4ff164ef416f5175793e2b5b"`);
        await queryRunner.query(`ALTER TABLE "profile_services_service" DROP CONSTRAINT "FK_29a37ec9e3a8237f5cf396a945f"`);
        await queryRunner.query(`ALTER TABLE "profile_services_service" DROP CONSTRAINT "FK_1a341548d651606fab3c7bcf305"`);
        await queryRunner.query(`ALTER TABLE "service_service_champions_profile" DROP CONSTRAINT "FK_1b33cccdc89c49133ad2ae9eb70"`);
        await queryRunner.query(`ALTER TABLE "service_service_champions_profile" DROP CONSTRAINT "FK_ff965e15620b8c0fed1b1946684"`);
        await queryRunner.query(`ALTER TABLE "service_service_participators_profile" DROP CONSTRAINT "FK_3c9f1c89167f99c0027abaa0537"`);
        await queryRunner.query(`ALTER TABLE "service_service_participators_profile" DROP CONSTRAINT "FK_83a097fb1c4bf16d13b09b3d79c"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_06e08c500d8d22db40e6c70b760"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_ca0091955d027de6c31b6ae2e90"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "feedbacksId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_adebd287fcc3a86e3769e074e9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c30ba577bafb0404aa11fcfddd"`);
        await queryRunner.query(`DROP TABLE "review_reviewer_profile"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37e0a3e2411a4af1548ae1653b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6f4ff164ef416f5175793e2b5"`);
        await queryRunner.query(`DROP TABLE "profile_requested_services_service"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29a37ec9e3a8237f5cf396a945"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1a341548d651606fab3c7bcf30"`);
        await queryRunner.query(`DROP TABLE "profile_services_service"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b33cccdc89c49133ad2ae9eb7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff965e15620b8c0fed1b194668"`);
        await queryRunner.query(`DROP TABLE "service_service_champions_profile"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c9f1c89167f99c0027abaa053"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83a097fb1c4bf16d13b09b3d79"`);
        await queryRunner.query(`DROP TABLE "service_service_participators_profile"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_06e08c500d8d22db40e6c70b760" FOREIGN KEY ("reviewedId") REFERENCES "service_participator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
