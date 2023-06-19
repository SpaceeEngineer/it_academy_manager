import { MigrationInterface, QueryRunner } from 'typeorm';

export class statusColumnCourseTableUpdate1658854248268 implements MigrationInterface {
  name = 'statusColumnCourseTableUpdate1658854248268';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."courses_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "status" "public"."courses_status_enum" NOT NULL DEFAULT 'active'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."courses_status_enum"`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "status" integer`);
  }
}
