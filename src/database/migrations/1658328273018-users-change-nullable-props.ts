import { MigrationInterface, QueryRunner } from 'typeorm';

export class usersChangeNullableProps1658328273018 implements MigrationInterface {
  name = 'usersChangeNullableProps1658328273018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "city" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dob" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dob" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "city" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
  }
}
