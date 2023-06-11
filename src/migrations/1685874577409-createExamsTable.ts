import { EXAM_STATUS } from '../modules/v1/exams/constants';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateExamsTable1685874577409
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exams',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'challenge_id',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'spend_time',
            type: 'int',
            isNullable: true,
            default: 0,
          },
          {
            name: 'score',
            type: 'int4',
            isNullable: false,
            default: 0,
          },
          {
            name: 'status',
            type: 'int4',
            isNullable: false,
            default: EXAM_STATUS.PENDING,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'exam-user-fk',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
          },
          {
            name: 'exam-challenge-fk',
            columnNames: ['challenge_id'],
            referencedTableName: 'challenges',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exams', true, true);
  }
}
