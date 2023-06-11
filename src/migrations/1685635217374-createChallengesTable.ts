import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createChallengesTable1685635217374
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'challenges',
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
            name: 'subject_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'VARCHAR(255)',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'number_of_questions',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'passing_score',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'max_retries',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'security_level',
            type: 'tinyInt',
            isNullable: false,
            default: 1,
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: 1,
          },
          {
            name: 'is_public',
            type: 'boolean',
            isNullable: false,
            default: 1,
          },
          {
            name: 'created_by',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'updated_by',
            type: 'int4',
            isNullable: true,
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
            name: 'challenge-subject-fk',
            columnNames: ['subject_id'],
            referencedTableName: 'subjects',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['created_by'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['updated_by'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('challenges', true, true);
  }
}
