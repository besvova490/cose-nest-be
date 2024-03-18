import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedBaseAppModels1710274265803 implements MigrationInterface {
    name = 'CreatedBaseAppModels1710274265803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "rating" integer NOT NULL, "message" character varying, "reviewedId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "url" character varying NOT NULL, "reviewId" integer, CONSTRAINT "UQ_49cf87614865cceff86847dcad9" UNIQUE ("url"), CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "description" character varying NOT NULL, "logoId" integer, CONSTRAINT "REL_72c4cb9c6f4df7667869123e92" UNIQUE ("logoId"), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_participator" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "profileId" integer, "feedbacksId" integer, CONSTRAINT "REL_5e97e8302b6b3adfd436b1e286" UNIQUE ("profileId"), CONSTRAINT "PK_2f27eee74c5d67bbad5abf6a3dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "ref" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "price" integer NOT NULL, "note" character varying, "paymentType" character varying NOT NULL, "paymentStatus" character varying NOT NULL DEFAULT 'pending', "orderConfirmationId" integer, CONSTRAINT "UQ_4fa992eb0133cd958978cddf22d" UNIQUE ("ref"), CONSTRAINT "REL_1807e740ba9f1fb54f24bdeacc" UNIQUE ("orderConfirmationId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review_reviewer_service_participator" ("reviewId" integer NOT NULL, "serviceParticipatorId" integer NOT NULL, CONSTRAINT "PK_6b330043b05c7e834ff2d935e56" PRIMARY KEY ("reviewId", "serviceParticipatorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e060961228c0a5d1d4c54c732e" ON "review_reviewer_service_participator" ("reviewId") `);
        await queryRunner.query(`CREATE INDEX "IDX_05f041359aec2008e7aa153e99" ON "review_reviewer_service_participator" ("serviceParticipatorId") `);
        await queryRunner.query(`CREATE TABLE "service_service_participators_service_participator" ("serviceId" integer NOT NULL, "serviceParticipatorId" integer NOT NULL, CONSTRAINT "PK_235591a629520bb8841a4ee8da4" PRIMARY KEY ("serviceId", "serviceParticipatorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0cf97bc4f6fa18fd1dba29e7df" ON "service_service_participators_service_participator" ("serviceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b7f82d9ab2a37346aa8aa1f591" ON "service_service_participators_service_participator" ("serviceParticipatorId") `);
        await queryRunner.query(`CREATE TABLE "service_service_champions_service_participator" ("serviceId" integer NOT NULL, "serviceParticipatorId" integer NOT NULL, CONSTRAINT "PK_6f026c969e9dc2f85bc5ea5e8e7" PRIMARY KEY ("serviceId", "serviceParticipatorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c4d0a97fd746e2added627dfad" ON "service_service_champions_service_participator" ("serviceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1eecfeff833f8384847214193" ON "service_service_champions_service_participator" ("serviceParticipatorId") `);
        await queryRunner.query(`CREATE TABLE "service_participator_services_service" ("serviceParticipatorId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_36323daefeef925b1490ebbf4a5" PRIMARY KEY ("serviceParticipatorId", "serviceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a7514a1b8a9eab91b14e8e3700" ON "service_participator_services_service" ("serviceParticipatorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4203b95a2e605133c3964e2a07" ON "service_participator_services_service" ("serviceId") `);
        await queryRunner.query(`CREATE TABLE "service_participator_requested_services_service" ("serviceParticipatorId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_502a31e1c36b3ed7395eea62e83" PRIMARY KEY ("serviceParticipatorId", "serviceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e4cb30b67b9c579b9e18f32cea" ON "service_participator_requested_services_service" ("serviceParticipatorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_93651ed9458795b5e616bb2dcf" ON "service_participator_requested_services_service" ("serviceId") `);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_06e08c500d8d22db40e6c70b760" FOREIGN KEY ("reviewedId") REFERENCES "service_participator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_4a30a9c3443948721886525511d" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_72c4cb9c6f4df7667869123e923" FOREIGN KEY ("logoId") REFERENCES "document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_participator" ADD CONSTRAINT "FK_5e97e8302b6b3adfd436b1e2864" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_participator" ADD CONSTRAINT "FK_87bba1c028d3b2c8c46fe03d04f" FOREIGN KEY ("feedbacksId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_1807e740ba9f1fb54f24bdeacce" FOREIGN KEY ("orderConfirmationId") REFERENCES "document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review_reviewer_service_participator" ADD CONSTRAINT "FK_e060961228c0a5d1d4c54c732ec" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review_reviewer_service_participator" ADD CONSTRAINT "FK_05f041359aec2008e7aa153e99a" FOREIGN KEY ("serviceParticipatorId") REFERENCES "service_participator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_service_participators_service_participator" ADD CONSTRAINT "FK_0cf97bc4f6fa18fd1dba29e7df2" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_service_participators_service_participator" ADD CONSTRAINT "FK_b7f82d9ab2a37346aa8aa1f5910" FOREIGN KEY ("serviceParticipatorId") REFERENCES "service_participator"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_service_champions_service_participator" ADD CONSTRAINT "FK_c4d0a97fd746e2added627dfad3" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_service_champions_service_participator" ADD CONSTRAINT "FK_a1eecfeff833f83848472141938" FOREIGN KEY ("serviceParticipatorId") REFERENCES "service_participator"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_participator_services_service" ADD CONSTRAINT "FK_a7514a1b8a9eab91b14e8e37000" FOREIGN KEY ("serviceParticipatorId") REFERENCES "service_participator"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_participator_services_service" ADD CONSTRAINT "FK_4203b95a2e605133c3964e2a07c" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_participator_requested_services_service" ADD CONSTRAINT "FK_e4cb30b67b9c579b9e18f32ceab" FOREIGN KEY ("serviceParticipatorId") REFERENCES "service_participator"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_participator_requested_services_service" ADD CONSTRAINT "FK_93651ed9458795b5e616bb2dcfa" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_participator_requested_services_service" DROP CONSTRAINT "FK_93651ed9458795b5e616bb2dcfa"`);
        await queryRunner.query(`ALTER TABLE "service_participator_requested_services_service" DROP CONSTRAINT "FK_e4cb30b67b9c579b9e18f32ceab"`);
        await queryRunner.query(`ALTER TABLE "service_participator_services_service" DROP CONSTRAINT "FK_4203b95a2e605133c3964e2a07c"`);
        await queryRunner.query(`ALTER TABLE "service_participator_services_service" DROP CONSTRAINT "FK_a7514a1b8a9eab91b14e8e37000"`);
        await queryRunner.query(`ALTER TABLE "service_service_champions_service_participator" DROP CONSTRAINT "FK_a1eecfeff833f83848472141938"`);
        await queryRunner.query(`ALTER TABLE "service_service_champions_service_participator" DROP CONSTRAINT "FK_c4d0a97fd746e2added627dfad3"`);
        await queryRunner.query(`ALTER TABLE "service_service_participators_service_participator" DROP CONSTRAINT "FK_b7f82d9ab2a37346aa8aa1f5910"`);
        await queryRunner.query(`ALTER TABLE "service_service_participators_service_participator" DROP CONSTRAINT "FK_0cf97bc4f6fa18fd1dba29e7df2"`);
        await queryRunner.query(`ALTER TABLE "review_reviewer_service_participator" DROP CONSTRAINT "FK_05f041359aec2008e7aa153e99a"`);
        await queryRunner.query(`ALTER TABLE "review_reviewer_service_participator" DROP CONSTRAINT "FK_e060961228c0a5d1d4c54c732ec"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_1807e740ba9f1fb54f24bdeacce"`);
        await queryRunner.query(`ALTER TABLE "service_participator" DROP CONSTRAINT "FK_87bba1c028d3b2c8c46fe03d04f"`);
        await queryRunner.query(`ALTER TABLE "service_participator" DROP CONSTRAINT "FK_5e97e8302b6b3adfd436b1e2864"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_72c4cb9c6f4df7667869123e923"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_4a30a9c3443948721886525511d"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_06e08c500d8d22db40e6c70b760"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_93651ed9458795b5e616bb2dcf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e4cb30b67b9c579b9e18f32cea"`);
        await queryRunner.query(`DROP TABLE "service_participator_requested_services_service"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4203b95a2e605133c3964e2a07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7514a1b8a9eab91b14e8e3700"`);
        await queryRunner.query(`DROP TABLE "service_participator_services_service"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a1eecfeff833f8384847214193"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4d0a97fd746e2added627dfad"`);
        await queryRunner.query(`DROP TABLE "service_service_champions_service_participator"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7f82d9ab2a37346aa8aa1f591"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0cf97bc4f6fa18fd1dba29e7df"`);
        await queryRunner.query(`DROP TABLE "service_service_participators_service_participator"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_05f041359aec2008e7aa153e99"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e060961228c0a5d1d4c54c732e"`);
        await queryRunner.query(`DROP TABLE "review_reviewer_service_participator"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "service_participator"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
