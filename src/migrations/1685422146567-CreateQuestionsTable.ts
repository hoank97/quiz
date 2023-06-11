import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKeyOptions,
} from 'typeorm';

export class CreateQuestionsTable1685422146567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'tinyint',
            isNullable: false,
          },
          {
            name: 'answer',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'tinyint',
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
            name: 'created_by',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
            default: 'current_timestamp',
          },
          {
            name: 'updated_by',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
            default: 'current_timestamp',
            onUpdate: 'current_timestamp',
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
            onUpdate: 'current_timestamp()',
          },
        ] as TableColumn[],
        foreignKeys: [
          {
            columnNames: ['created_by'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['updated_by'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ] as TableForeignKeyOptions[],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questions', true, true);
  }
}
