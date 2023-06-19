import { MigrationInterface, QueryRunner } from 'typeorm';

export class lessonsFields1655842581838 implements MigrationInterface {
  name = 'lessonsFields1655842581838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lessons" ("id" SERIAL NOT NULL, "lecturer" character varying(255) NOT NULL, "course_id" integer NOT NULL, "date_and_time" TIMESTAMP NOT NULL, "link" character varying(255) NOT NULL, "home_task_description" character varying(600) NOT NULL, CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lessons_users" ("lessons_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_de26b0a3b12677d240dff9ee980" PRIMARY KEY ("lessons_id", "user_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_26ebf4b8b4b60ee5c169a742dc" ON "lessons_users" ("lessons_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1b109b7edab60635440f366b07" ON "lessons_users" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_e1b51a7aad70568d09e2fb4a619" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons_users" ADD CONSTRAINT "FK_26ebf4b8b4b60ee5c169a742dcd" FOREIGN KEY ("lessons_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons_users" ADD CONSTRAINT "FK_1b109b7edab60635440f366b070" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons_users" DROP CONSTRAINT "FK_1b109b7edab60635440f366b070"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons_users" DROP CONSTRAINT "FK_26ebf4b8b4b60ee5c169a742dcd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_e1b51a7aad70568d09e2fb4a619"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_1b109b7edab60635440f366b07"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_26ebf4b8b4b60ee5c169a742dc"`);
    await queryRunner.query(`DROP TABLE "lessons_users"`);
    await queryRunner.query(`DROP TABLE "lessons"`);
  }
}
