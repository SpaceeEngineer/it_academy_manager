import { MigrationInterface, QueryRunner } from 'typeorm';

export class addLogins1656601595654 implements MigrationInterface {
  name = 'addLogins1656601595654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_login_history" ("id" SERIAL NOT NULL, "login_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "PK_cc6cb18451f716b40ed6cd898b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_login_history" ADD CONSTRAINT "FK_fc5af9fb82dbb8d0afe1076caf1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_login_history" DROP CONSTRAINT "FK_fc5af9fb82dbb8d0afe1076caf1"`,
    );
    await queryRunner.query(`DROP TABLE "user_login_history"`);
  }
}
