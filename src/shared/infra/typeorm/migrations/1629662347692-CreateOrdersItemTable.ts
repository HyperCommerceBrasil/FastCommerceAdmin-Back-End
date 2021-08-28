import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOrdersItemTable1629662347692
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ordersItems',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'orderId',
            type: 'uuid',
            isGenerated: true,
          },
          {
            name: 'productId',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'float8',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ordersItems',
      new TableForeignKey({
        columnNames: ['orderId'],
        name: 'FkOrderItem',
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
      }),
    );

    await queryRunner.createForeignKey(
      'ordersItems',
      new TableForeignKey({
        columnNames: ['productId'],
        name: 'FkProductOrder',
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ordersItems');
  }
}
