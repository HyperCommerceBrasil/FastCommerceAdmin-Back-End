import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnInProductTypeStorage1631382756926
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'typeStorage',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'typeStorage');
  }
}
