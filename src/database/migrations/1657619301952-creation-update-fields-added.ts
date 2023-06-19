import { MigrationInterface, QueryRunner } from 'typeorm';

export class creationUpdateFieldsAdded1657619301952 implements MigrationInterface {
  name = 'creationUpdateFieldsAdded1657619301952';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "created_at"`);
  }
}
