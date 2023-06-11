import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterTableSubjects1686276595458
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'subjects',
      new TableColumn({
        name: 'category_id',
        type: 'int4',
        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      'subjects',
      new TableForeignKey({
        name: 'subject-category-fk',
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('subjects', 'subject-category-fk');
    await queryRunner.dropColumn('subjects', 'category_id');
  }
}
