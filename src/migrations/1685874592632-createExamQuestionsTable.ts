import { QUESTION_STATUS } from '../modules/v1/exam-questions/constants';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateExamQuestionsTable1685874592632
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exam_question',
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
            name: 'exam_id',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'question_id',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'user_answered',
            type: 'JSON',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'int4',
            isNullable: true,
            default: QUESTION_STATUS.PENDING,
          },
          {
            name: 'question_content',
            type: 'TEXT',
            isNullable: false,
          },
          {
            name: 'question_answer',
            type: 'JSON',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'exam-question-exam-fk',
            columnNames: ['exam_id'],
            referencedTableName: 'exams',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
          },
          {
            name: 'exam-question-question-fk',
            columnNames: ['question_id'],
            referencedTableName: 'questions',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exam_question', true, true);
  }
}
