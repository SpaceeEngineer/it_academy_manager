import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteUser1657651965315 implements MigrationInterface {
  name = 'deleteUser1657651965315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_login_history" DROP CONSTRAINT "FK_fc5af9fb82dbb8d0afe1076caf1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_login_history" ADD CONSTRAINT "FK_fc5af9fb82dbb8d0afe1076caf1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_login_history" DROP CONSTRAINT "FK_fc5af9fb82dbb8d0afe1076caf1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_login_history" ADD CONSTRAINT "FK_fc5af9fb82dbb8d0afe1076caf1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
