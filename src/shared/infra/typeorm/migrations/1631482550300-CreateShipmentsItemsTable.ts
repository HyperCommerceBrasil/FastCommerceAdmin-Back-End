import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateShipmentsItemsTable1631482550300
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shipmentsItems',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'shipmentId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'orderItemId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'orderId',
            type: 'uuid',
            isNullable: true,
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
      'shipmentsItems',
      new TableForeignKey({
        columnNames: ['orderId'],
        name: 'FkOrderShipmentItem',
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
      }),
    );

    await queryRunner.createForeignKey(
      'shipmentsItems',
      new TableForeignKey({
        columnNames: ['shipmentId'],
        name: 'FkShipmentId',
        referencedColumnNames: ['id'],
        referencedTableName: 'shipments',
      }),
    );

    await queryRunner.createForeignKey(
      'shipmentsItems',
      new TableForeignKey({
        columnNames: ['orderItemId'],
        name: 'FkShipmentItems',
        referencedColumnNames: ['id'],
        referencedTableName: 'ordersItems',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shipmentsItems');
  }
}
