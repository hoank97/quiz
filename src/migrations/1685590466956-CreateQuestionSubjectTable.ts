import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKeyOptions,
} from 'typeorm';

export class CreateQuestionSubjectTable1685590466956
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'question_subject',
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
            name: 'question_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'subject_id',
            type: 'int',
            isNullable: true,
          },
        ] as TableColumn[],
        foreignKeys: [
          {
            columnNames: ['question_id'],
            referencedTableName: 'questions',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['subject_id'],
            referencedTableName: 'subjects',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ] as TableForeignKeyOptions[],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('question_subject', true, true);
  }
}
