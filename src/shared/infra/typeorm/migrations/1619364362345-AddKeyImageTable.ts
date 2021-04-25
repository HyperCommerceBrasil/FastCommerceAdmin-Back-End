import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddKeyImageTable1619364362345
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product_images',
      new TableColumn({
        name: 'key',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product_images', 'key');
  }
}
