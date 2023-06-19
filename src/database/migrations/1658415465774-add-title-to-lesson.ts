import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTitleToLesson1658415465774 implements MigrationInterface {
  name = 'addTitleToLesson1658415465774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_login_history" DROP CONSTRAINT "FK_fc5af9fb82dbb8d0afe1076caf1"`,
    );
    await queryRunner.query(`ALTER TABLE "lessons" ADD "title" character varying(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_login_history" ADD CONSTRAINT "FK_fc5af9fb82dbb8d0afe1076caf1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_login_history" DROP CONSTRAINT "FK_fc5af9fb82dbb8d0afe1076caf1"`,
    );
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "user_login_history" ADD CONSTRAINT "FK_fc5af9fb82dbb8d0afe1076caf1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
