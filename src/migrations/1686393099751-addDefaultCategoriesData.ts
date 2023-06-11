import { CATEGORIES_DEFAULT_DATA } from '../modules/v1/categories/constants/default-data';
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddDefaultCategoriesData1686393099751
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const data of CATEGORIES_DEFAULT_DATA) {
      await queryRunner.query(
        `INSERT INTO categories (name) VALUES ('${data}')`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const data of CATEGORIES_DEFAULT_DATA) {
      await queryRunner.query(`DELETE FROM categories where name='${data}'`);
    }
  }
}
