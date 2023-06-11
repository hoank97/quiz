import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyDeletedAtColumn1686109037029 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE questions MODIFY COLUMN deleted_at datetime NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE questions MODIFY COLUMN deleted_at datetime NULL ON UPDATE current_timestamp()`
    );
  }
}
