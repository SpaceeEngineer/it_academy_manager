import { MigrationInterface, QueryRunner } from 'typeorm';

export class addLessonsToCourses1656521977009 implements MigrationInterface {
  name = 'addLessonsToCourses1656521977009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_e1b51a7aad70568d09e2fb4a619"`,
    );
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "startDate"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "endDate"`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "start_date" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "end_date" TIMESTAMP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe"`,
    );
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "end_date"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "start_date"`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "endDate" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "startDate" TIMESTAMP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_e1b51a7aad70568d09e2fb4a619" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
