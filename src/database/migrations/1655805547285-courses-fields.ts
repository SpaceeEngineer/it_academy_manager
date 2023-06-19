import { MigrationInterface, QueryRunner } from 'typeorm';

export class coursesFields1655805547285 implements MigrationInterface {
  name = 'coursesFields1655805547285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "status" character varying(255) NOT NULL, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses_users" ("course_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_ac62ff60c15e7616da5abf25d7f" PRIMARY KEY ("course_id", "user_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9abbec354553360264444147a7" ON "courses_users" ("course_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c25d8200edfcd42bc83ffcd52e" ON "courses_users" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_users" ADD CONSTRAINT "FK_9abbec354553360264444147a71" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_users" ADD CONSTRAINT "FK_c25d8200edfcd42bc83ffcd52e0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses_users" DROP CONSTRAINT "FK_c25d8200edfcd42bc83ffcd52e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_users" DROP CONSTRAINT "FK_9abbec354553360264444147a71"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_c25d8200edfcd42bc83ffcd52e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9abbec354553360264444147a7"`);
    await queryRunner.query(`DROP TABLE "courses_users"`);
    await queryRunner.query(`DROP TABLE "courses"`);
  }
}
