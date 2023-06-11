import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterExamQuestionTable1686049587677
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE exam_question RENAME COLUMN question_content TO content;`
    );
    await queryRunner.query(
      `ALTER TABLE exam_question RENAME COLUMN question_answer TO answers;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE exam_question RENAME COLUMN content TO question_content;`
    );
    await queryRunner.query(
      `ALTER TABLE exam_question RENAME COLUMN answers TO question_answer;`
    );
  }
}
