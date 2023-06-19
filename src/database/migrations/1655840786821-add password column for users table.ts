import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPasswordColumnForUsersTable1655840786821 implements MigrationInterface {
  name = 'addPasswordColumnForUsersTable1655840786821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
  }
}
